import { socialHref } from '@/lib/socialLinks';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FloatingContactButtons — call + WhatsApp shortcuts pinned to the right edge
 * of the viewport.
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendered once from the root layout (not per-page) so it stays fixed and
 * visible above every route, through scroll, without each page needing to
 * remember to include it.
 *
 * Phone number matches the one in the footer's "Contact Us" block; WhatsApp
 * number comes from the shared socialLinks source so both stay in sync with
 * the rest of the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const PHONE_NUMBER = '+919188913114';
const PHONE_DISPLAY = '+91 91889 13114';

export default function FloatingContactButtons() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 'clamp(12px, 2.5vw, 32px)',
        bottom: 'clamp(20px, 4vw, 40px)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(10px, 1.25vw, 16px)',
      }}
    >
      {/* Call */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label={`Call Chameri at ${PHONE_DISPLAY}`}
        className="transition-transform duration-200 hover:scale-110"
        style={{
          width: 'clamp(44px, 4.0vw, 50px)',
          height: 'clamp(44px, 4.0vw, 50px)',
          borderRadius: '50%',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          style={{ width: 'clamp(18px, 1.8vw, 24px)', height: 'clamp(18px, 1.8vw, 24px)' }}
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={socialHref('WhatsApp')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Chameri on WhatsApp"
        className="transition-transform duration-200 hover:scale-110"
        style={{
          width: 'clamp(44px, 4.0vw, 50px)',
          height: 'clamp(44px, 4.0vw, 50px)',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          style={{ width: 'clamp(20px, 2vw, 27px)', height: 'clamp(20px, 2vw, 27px)' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
