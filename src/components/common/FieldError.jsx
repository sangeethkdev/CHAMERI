'use client';

/** Shared so a failing field's underline matches its message. */
export const FIELD_ERROR_COLOR = '#B3261E';

/**
 * Inline validation message shown beneath a contact-form field.
 *
 * `role="alert"` so screen readers announce it the moment it appears after a
 * failed submit. Renders nothing when there is no message, so it takes up no
 * space in the form's flex flow until a field actually fails.
 */
export default function FieldError({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      className="font-sans font-normal"
      style={{
        margin:     '5px 0 0',
        fontSize:   'clamp(11px, 0.83vw, 13px)',
        lineHeight: 1.35,
        color:      '#B3261E',
      }}
    >
      {children}
    </p>
  );
}
