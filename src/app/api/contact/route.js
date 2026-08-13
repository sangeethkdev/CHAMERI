import { Resend } from 'resend';
import { isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Contact form email delivery via Resend.
 *
 * Runs server-side so the Resend API key never reaches the browser (unlike
 * the EmailJS public key this replaces). The visitor's browser only ever
 * talks to this route; this route talks to Resend.
 *
 *   POST /api/contact
 *   { "name": "...", "email": "...", "phone": "...", "message": "...", "source": "..." }
 *
 * Requires in .env.local:
 *   RESEND_API_KEY     → Resend Dashboard → API Keys → Create API Key
 *   CONTACT_EMAIL       → inbox that should receive enquiries
 *   RESEND_FROM_EMAIL   → optional, must be on a Resend-verified domain
 *                          (falls back to Resend's shared test address)
 */

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Website Contact <onboarding@resend.dev>';

// Enquiries land in an HTML email — escape user input so a message like
// "<img src=x onerror=...>" can't inject markup into the recipient's inbox.
// Reused for attribute contexts too (mailto:/tel: hrefs), which is why quotes
// are escaped as well as the usual angle brackets.
const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);

// Brand palette, matched to the Kiwano section components (navy heading text
// / cream section background) since that's the only consistent palette in
// the codebase — logo SVGs aren't reliably renderable across email clients,
// so the header is a styled wordmark instead of an image.
const NAVY = '#041D35';
const SLATE = '#334454';
const CREAM = '#EDE7DE';
const INK = '#1A1A1A';
const MUTED = '#8A8F98';

/** A table-based layout (not flex/div) so this renders correctly in Outlook,
 *  which uses Word's HTML engine and ignores most modern CSS. */
function buildContactEmailHtml({ name, email, phone, message, source }) {
  const row = (label, valueHtml) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #F0EEE9;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:${MUTED};width:110px;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #F0EEE9;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${INK};vertical-align:top;">${valueHtml}</td>
        </tr>`;

  const receivedAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : '';
  const telHref = phone ? phone.replace(/[^0-9+]/g, '') : '';

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:${CREAM};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background-color:${NAVY};padding:28px 32px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:3px;color:#ffffff;text-transform:uppercase;">Chameri</div>
                <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#9FB3C8;margin-top:4px;letter-spacing:0.3px;">New website enquiry</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <span style="display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:${SLATE};background-color:${CREAM};padding:5px 12px;border-radius:999px;">
                  ${escapeHtml(source || 'Website')}
                </span>
                <p style="margin:10px 0 20px;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:${MUTED};">Received ${receivedAt} IST</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row('Name', safeName)}
                  ${row('Email', `<a href="mailto:${safeEmail}" style="color:${NAVY};text-decoration:none;">${safeEmail}</a>`)}
                  ${phone ? row('Phone', `<a href="tel:${telHref}" style="color:${NAVY};text-decoration:none;">${safePhone}</a>`) : ''}
                </table>

                <div style="margin-top:24px;padding:20px;background-color:${CREAM};border-radius:8px;border-left:3px solid ${NAVY};">
                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${SLATE};margin-bottom:8px;">Message</div>
                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${INK};white-space:pre-wrap;">${escapeHtml(message)}</div>
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:6px;background-color:${NAVY};">
                      <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 24px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:6px;">Reply to ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#F7F5F1;border-top:1px solid #E5E1D8;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#9AA0A6;">This enquiry was submitted through the contact form on chameribuilders.com.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, message, source } = body || {};

  if (!name || !email || !message) {
    return Response.json(
      { success: false, message: 'Required fields are missing.' },
      { status: 400 }
    );
  }

  // Mirrors useContactForm's client-side check so a request sent straight to
  // this route — bypassing the browser form — can't slip an invalid phone
  // number into the enquiry email.
  if (!phone || !isValidPhoneNumber(phone)) {
    return Response.json(
      { success: false, message: 'Please provide a valid phone number.' },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error(
      '[contact] Resend is not configured — set RESEND_API_KEY and CONTACT_EMAIL in .env.local, ' +
      'then restart the dev server.'
    );
    return Response.json(
      { success: false, message: 'Email delivery is not configured.' },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name} — ${source || 'Website'}`,
      html: buildContactEmailHtml({ name, email, phone, message, source }),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return Response.json({ success: false, message: 'Failed to send email.' }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Email sent successfully.', data });
  } catch (err) {
    console.error('[contact] Resend send failed:', err?.message || err);
    return Response.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}
