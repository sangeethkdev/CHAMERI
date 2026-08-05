import React from 'react';

const HTML_TAG_RE = /<\/?[a-z][\s\S]*>/i;

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Turn a stored description into renderable HTML.
 * Values authored in the admin rich text editor already are HTML (sanitized
 * server-side on save). Older plain-text values are lifted into paragraphs so
 * line breaks survive instead of collapsing into one block.
 */
export const toRichHtml = (value) => {
  if (!value) return '';
  const str = String(value).trim();
  if (!str) return '';
  if (HTML_TAG_RE.test(str)) return str;

  return str
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br />')}</p>`)
    .join('');
};

export const hasRichText = (value) => toRichHtml(value).length > 0;

/**
 * RichText
 * Renders admin-authored rich text. Typography (font, size, colour, spacing)
 * comes from the `style` passed by the caller so the block keeps the exact
 * look of the section it lives in; `.rich-text` in globals.css only restores
 * the element-level formatting the CSS reset strips (lists, bold, links).
 *
 * @param {string}  html      stored description (HTML or legacy plain text)
 * @param {object}  style     inline styles for the wrapper
 * @param {node}    fallback  rendered when there is no content
 */
export default function RichText({ html, className = '', style, fallback = null, as: Tag = 'div' }) {
  const markup = toRichHtml(html);

  if (!markup) {
    if (!fallback) return null;
    return (
      <Tag className={`rich-text ${className}`.trim()} style={style}>
        {fallback}
      </Tag>
    );
  }

  return (
    <Tag
      className={`rich-text ${className}`.trim()}
      style={style}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
