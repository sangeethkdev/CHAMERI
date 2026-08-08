'use client';

import { useCallback, useState } from 'react';
import emailjs from '@emailjs/browser';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * useContactForm — shared state, validation and EmailJS delivery for every
 * contact form on the site (home, gallery, project-list, contact page).
 * ─────────────────────────────────────────────────────────────────────────────
 * All four forms carry the same four fields, so this lives here once rather
 * than being copy-pasted per section.
 *
 * DELIVERY — two independent sends on submit:
 *   1. EmailJS, straight from the browser — this is what actually notifies
 *      the team, and its success/failure drives the UI status message.
 *      Set these in .env.local (see the block there for where to find each):
 *        NEXT_PUBLIC_EMAILJS_SERVICE_ID
 *        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 *        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 *      The destination address is set on the EmailJS template itself
 *      ("To Email"), not here — so changing the recipient needs no code change.
 *   2. POST /api/contacts on the admin backend — persists the enquiry so it
 *      shows up in the admin dashboard (Recent Inquiries, New Inquiries
 *      count). Best-effort: a failure here is logged but never blocks the
 *      visitor's success message, since EmailJS already delivered the
 *      enquiry to the team's inbox regardless of database state.
 *      Uses NEXT_PUBLIC_API_URL (see src/lib/api.js for the same pattern).
 *
 * Validation behaviour:
 *   • Nothing is validated until the first submit attempt, so a user typing
 *     through the form for the first time is never shown a red error.
 *   • After that first attempt, an individual field's error clears as soon as
 *     the user edits it — rather than waiting for the next submit.
 *   • The form element must carry `noValidate`, otherwise the browser's own
 *     bubbles fire first and the inline messages never get a chance to show.
 */

const EMPTY = { name: '', email: '', phone: '', message: '' };

/* The public key is meant to be exposed in the browser — that is how EmailJS
   works — so NEXT_PUBLIC_ is correct. It does mean anyone can read it and
   spend your monthly quota, so lock the account to your own domains under
   EmailJS → Account → Security → Allowed Origins. */
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/* Best-effort save to the admin backend so the enquiry shows up in the
   dashboard. Never throws — a dead backend must not stop the visitor's
   message from sending via EmailJS. */
async function saveContactToBackend(form, source) {
  try {
    const res = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: source,
        message: form.message,
      }),
    });
    if (!res.ok) {
      console.error(`[contact] backend save failed: HTTP ${res.status}`);
    }
  } catch (err) {
    console.error('[contact] backend save failed:', err?.message || err);
  }
}

/* Deliberately permissive — enough to catch "not an address at all" without
   rejecting valid but unusual mailboxes. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* react-phone-number-input seeds the field with the country dial code, so
   `form.phone` is "+91" the moment the picker mounts even though the user has
   typed nothing. A plain emptiness check would treat that as filled — count
   the digits and require a real national number behind the dial code. */
const PHONE_MIN_DIGITS = 8;

export function validateContactForm(values) {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email?.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = (values.phone || '').replace(/\D/g, '');
  if (!phoneDigits) {
    errors.phone = 'Please enter your phone number.';
  } else if (phoneDigits.length < PHONE_MIN_DIGITS) {
    errors.phone = 'Please enter a complete phone number.';
  }

  if (!values.message?.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

/**
 * @param {string} source  Which form this is, surfaced in the email so you can
 *                         tell a home-page enquiry from a gallery one.
 */
export default function useContactForm(source = 'Website') {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  /* 'idle' | 'sending' | 'sent' | 'error' */
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const clearError = useCallback((field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;          // no re-render when nothing changes
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);

  /* PhoneInput reports its value directly, not through an event, and gives
     `undefined` when cleared. */
  const handlePhoneChange = useCallback((value) => {
    setForm((prev) => ({ ...prev, phone: value || '' }));
    clearError('phone');
  }, [clearError]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const found = validateContactForm(form);
    setErrors(found);
    setAttempted(true);

    if (Object.keys(found).length > 0) {
      /* Move focus to the first field that failed so keyboard and screen-reader
         users are taken to the problem instead of being left on the button. */
      const firstInvalid = ['name', 'email', 'phone', 'message'].find((f) => found[f]);
      formEl
        ?.querySelector?.(`[name="${firstInvalid}"], .PhoneInputInput`)
        ?.focus?.();
      return false;
    }

    // Fired independently of EmailJS below — an enquiry should still reach
    // the admin dashboard even if email delivery is misconfigured or down.
    saveContactToBackend(form, source);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Fail loudly in the console rather than showing the visitor a success
      // message for an email that was never sent.
      console.error(
        '[contact] EmailJS is not configured — set NEXT_PUBLIC_EMAILJS_SERVICE_ID, ' +
        'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local, ' +
        'then restart the dev server.'
      );
      setStatus('error');
      setStatusMessage('Could not send your message. Please try again.');
      return false;
    }

    setStatus('sending');
    setStatusMessage('');

    try {
      /* These keys are the variables your EmailJS template can reference,
         e.g. {{name}} / {{email}} / {{phone}} / {{message}} / {{source}}.
         `reply_to` lets you hit Reply in Gmail and answer the sender. */
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          message:  form.message,
          source,
          reply_to: form.email,
        },
        PUBLIC_KEY
      );

      setForm(EMPTY);
      setAttempted(false);
      setStatus('sent');
      setStatusMessage('Thanks — your message has been sent. We will be in touch shortly.');
      return true;
    } catch (err) {
      // EmailJS rejects with { status, text } — the text names the real cause
      // (bad template id, origin not allow-listed, quota exhausted…).
      console.error('[contact] EmailJS send failed:', err?.text || err?.message || err);
      setStatus('error');
      setStatusMessage('Could not send your message. Please try again.');
      return false;
    }
  }, [form, source]);

  return {
    form, setForm, errors, attempted,
    status, statusMessage,
    handleChange, handlePhoneChange, handleSubmit,
  };
}
