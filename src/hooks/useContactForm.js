'use client';

import { useCallback, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * useContactForm — shared state, validation and Resend delivery for every
 * contact form on the site (home, gallery, project-list, contact page).
 * ─────────────────────────────────────────────────────────────────────────────
 * All four forms carry the same four fields, so this lives here once rather
 * than being copy-pasted per section.
 *
 * DELIVERY — two independent sends on submit:
 *   1. POST /api/contact (see src/app/api/contact/route.js) — this Next.js
 *      route handler sends the email via Resend and is what actually
 *      notifies the team; its success/failure drives the UI status message.
 *      Configure RESEND_API_KEY and CONTACT_EMAIL in .env.local (see the
 *      block there for details) — the API key stays server-side, unlike the
 *      EmailJS public key this replaces.
 *   2. POST /api/contacts on the admin backend — persists the enquiry so it
 *      shows up in the admin dashboard (Recent Inquiries, New Inquiries
 *      count). Best-effort: a failure here is logged but never blocks the
 *      visitor's success message, since the Resend route already delivered
 *      the enquiry to the team's inbox regardless of database state.
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/* Best-effort save to the admin backend so the enquiry shows up in the
   dashboard. Never throws — a dead backend must not stop the visitor's
   message from sending via the Resend route. */
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

  /* react-phone-number-input seeds the field with the country dial code, so
     `form.phone` is "+91" the moment the picker mounts even though the user
     has typed nothing — `isValidPhoneNumber` correctly rejects a bare dial
     code as incomplete, so no separate emptiness check is needed. It applies
     each country's own numbering-plan rules (length, prefixes, …) rather than
     a single digit-count guess, so a valid UK or US number isn't rejected by
     rules tuned for Indian numbers, and vice versa. */
  if (!values.phone?.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid phone number for the selected country.';
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

    // Fired independently of the Resend route below — an enquiry should
    // still reach the admin dashboard even if email delivery is
    // misconfigured or down.
    saveContactToBackend(form, source);

    setStatus('sending');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source,
        }),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to send message.');
      }

      setForm(EMPTY);
      setAttempted(false);
      setStatus('sent');
      setStatusMessage('Thanks — your message has been sent. We will be in touch shortly.');
      return true;
    } catch (err) {
      console.error('[contact] Send failed:', err?.message || err);
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
