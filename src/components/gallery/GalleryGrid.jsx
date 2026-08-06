'use client';

import Image from 'next/image';

const STATIC_COL1 = [
  { id: 1, src: '/dummyimages/Figure → Hepburn-20-480x320.jpg.svg', alt: 'Gallery Image 1', w: 441, h: 512 },
  { id: 3, src: '/dummyimages/e273958d502607f06d62edd61792f48b69b84f3e.jpg', alt: 'Gallery Image 3', w: 441, h: 483 },
  { id: 6, src: '/dummyimages/ab2a95a06e83c0793c45aa84bc54cd800e1c8716.jpg', alt: 'Gallery Image 6', w: 441, h: 489 },
];
const STATIC_COL2 = [
  { id: 2, src: '/dummyimages/Figure → Argo-5-480x720.jpg.svg', alt: 'Gallery Image 2', w: 349, h: 336 },
  { id: 4, src: '/dummyimages/b41115b835e2232a8e61bd8d04a193c1d7a5d351.png', alt: 'Gallery Image 4', w: 349, h: 384 },
  { id: 10, src: '/dummyimages/81b44908c049fd8e0792ca40e0fdee715ba1f7b0.jpg', alt: 'Gallery Image 10', w: 349, h: 433 },
  { id: 9, src: '/dummyimages/87e89594da613bb98c472da2cf1f7376200c358b.jpg', alt: 'Gallery Image 9', w: 348, h: 301 },
];
const STATIC_COL3 = [
  { id: 5, src: '/dummyimages/af18e0d9d8fdfe4f4a5d97f4fbf9edd12b1ff9df.png', alt: 'Gallery Image 5', w: 441, h: 512 },
  { id: 7, src: '/dummyimages/6bdc232e1c143f702a3a37c1909ea6a7c38d0002.png', alt: 'Gallery Image 7', w: 440, h: 449 },
  { id: 8, src: '/dummyimages/4366c570846f17b0de12329eb1fab383893fbc5c.jpg', alt: 'Gallery Image 8', w: 440, h: 522 },
];

export default function GalleryGrid({ galleryImages }) {
  let col1, col2, col3;
  if (galleryImages && galleryImages.length > 0) {
    // galleryImages is [String] — plain Cloudinary URLs
    const all = galleryImages
      .filter((src) => src)
      .map((src, i) => ({ id: i + 1, src, alt: `Gallery Image ${i + 1}`, w: 441, h: 512 }));
    if (all.length > 0) {
      col1 = all.filter((_, i) => i % 3 === 0);
      col2 = all.filter((_, i) => i % 3 === 1);
      col3 = all.filter((_, i) => i % 3 === 2);
    } else {
      col1 = STATIC_COL1;
      col2 = STATIC_COL2;
      col3 = STATIC_COL3;
    }
  } else {
    col1 = STATIC_COL1;
    col2 = STATIC_COL2;
    col3 = STATIC_COL3;
  }

  // Mobile shows a single naturally-ordered column (1,2,3,4,5…) rather than
  // the desktop masonry's column-by-column grouping — reconstruct that order
  // from the three columns via id, since both API and static data assign
  // ids sequentially before the round-robin column split.
  const flatImages = [...col1, ...col2, ...col3].sort((a, b) => a.id - b.id);

  return (
    <section className="w-full flex flex-col items-center" style={{ backgroundColor: '#EDE7DE' }}>
      
      {/* Header Container — `justify-center` so the pill sits on the section's
          centre line. (If the filter tabs below are ever re-enabled, this wants
          to go back to `justify-between` so they split left/right.) */}
      <div
        className="w-full flex justify-center items-start"
        style={{
          maxWidth: 'clamp(375px, 100vw, 1920px)',
          paddingTop: 'clamp(19px, 1.3vw, 19px)',
          paddingBottom: 'clamp(20px, 8.48vw, 48px)', 
          paddingLeft: 'clamp(20px, 5.13vw, 74px)',
          paddingRight: 'clamp(20px, 5.13vw, 74px)',
        }}
      >
        {/* Gallery Pill */}
        <div
          className="flex items-center"
          style={{
            paddingTop: 'clamp(0px, 3.5vw, 30.2px)',
            paddingBottom: 'clamp(0px, 0.5vw, 7.2px)',
            paddingLeft: 'clamp(2px, 1vw, 14px)',
            paddingRight: 'clamp(2px, 1vw, 14px)',
            height: 'clamp(20px, 2.3vw, 33.4px)',
            borderRadius: '90px',
            gap: 'clamp(7.2px, 0.7vw, 10px)',
            backgroundColor: '#EDE7DE',
          }}
        >
          <div
            className="bg-[#334454] flex-shrink-0"
            style={{
              width:        'clamp(10px, 0.97vw, 18.6px)',
              height:       'clamp(10px, 0.97vw, 18.6px)',
              borderRadius: 'clamp(2px, 0.21vw, 4px)',
            }}
          />
          {/* Figma @1440: Geist 400, 16.2px / 19.44px, ls -0.32px, uppercase.
              vw = DESIGN_PX / 1440 × 100 → 1.125vw / 1.35vw. */}
          <span
            className="font-sans font-normal uppercase text-[#000000] flex items-center justify-center"
            style={{
              fontSize:      'clamp(12px, 1.125vw, 16.2px)',
              lineHeight:    'clamp(14px, 1.35vw, 19.44px)',
              letterSpacing: '-0.32px',
            }}
          >
            GALLERY
          </span>
        </div>

        {/* Optional Filter Tabs (based on image context) */}
        {/* <div className="hidden md:flex rounded overflow-hidden" style={{ backgroundColor: '#7A8B99' }}>
          <button className="px-6 py-2 text-sm font-medium text-white" style={{ backgroundColor: '#334454' }}>Exterior</button>
          <button className="px-6 py-2 text-sm font-medium text-white hover:bg-[#334454]/50 transition-colors">Interior</button>
          <button className="px-6 py-2 text-sm font-medium text-white hover:bg-[#334454]/50 transition-colors">Amenities</button>
        </div> */}
      </div>

      {/* Masonry Grid */}
      <div 
        className="w-full flex justify-center"
        style={{
          maxWidth: 'clamp(375px, 100vw, 1920px)',
          paddingLeft: 'clamp(20px, 4.23vw, 61px)',
          paddingRight: 'clamp(20px, 4.23vw, 61px)',
          paddingBottom: 'clamp(30px, 3.54vw, 51px)'
        }}
      >
        {/* Mobile: single naturally-ordered column (1, 2, 3, 4, 5…) */}
        <div className="flex md:hidden flex-col w-full" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
          {flatImages.map((img) => (
            <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop/tablet: 3-column masonry */}
        <div className="hidden md:flex w-full" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>

          {/* Column 1 */}
          <div className="flex flex-col flex-1" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
            {col1.map((img) => (
              <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col flex-1" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
            {col2.map((img) => (
              <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col flex-1" style={{ gap: 'clamp(15px, 2.08vw, 30px)' }}>
            {col3.map((img) => (
              <div key={img.id} className="relative w-full overflow-hidden" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
