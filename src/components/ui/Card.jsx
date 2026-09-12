import React from 'react';
import Image from 'next/image';

/**
 * Card — generic image card with caption overlay.
 *
 * Props:
 *   img        {string}  – image src
 *   alt        {string}  – image alt text
 *   title      {string}  – card title
 *   subtitle   {string}  – small subtitle / meta text
 *   year       {string}  – optional year badge
 *   aspectRatio{string}  – e.g. "375/300" (default)
 *   className  {string}  – extra classes on wrapper
 */
const Card = ({
  img,
  alt = '',
  title,
  subtitle,
  year,
  aspectRatio = '375/300',
  className = '',
}) => {
  return (
    <div className={`relative group cursor-pointer ${className}`}>
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio }}>
        <Image
          src={img}
          alt={alt || title}
          fill
          sizes="(max-width: 768px) 90vw, 600px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-[8px] text-white text-[14px] font-sans">
            View →
          </div>
        </div>
      </div>

      {/* Caption */}
      {(title || subtitle || year) && (
        <div className="flex items-center justify-between mt-3 px-1">
          <p className="font-sans text-[13px] text-[#334454]/80">
            {title && <span className="font-medium text-[#334454]">{title}</span>}
            {title && subtitle && <span className="mx-1">—</span>}
            {subtitle && <span className="italic">{subtitle}</span>}
          </p>
          {year && <span className="font-sans text-[13px] text-[#334454]/60">{year}</span>}
        </div>
      )}
    </div>
  );
};

export default Card;
