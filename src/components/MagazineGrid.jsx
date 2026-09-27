import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../assets';
import GalleryLightbox from './GalleryLightbox';

// ─── Editorial layout patterns ────────────────────────────────────────────────
// Each layout takes (images, onClick) and returns JSX
const LAYOUTS = [
    // Layout A: Dramatic — large left portrait, two smaller portraits offset right
    (images, onClick, imagePositions = {}, imageHeights = {}) => (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3" style={{ minHeight: '88vh' }}>
            {/* Primary — tall */}
            <div
                className="md:col-span-7 mg-img-wrap cursor-pointer"
                onClick={() => onClick(0)}
                style={{ minHeight: '80vh', ...(imageHeights[images[0]] ? { height: imageHeights[images[0]], minHeight: imageHeights[images[0]] } : {}) }}
            >
                {images[0] && <img src={getImageUrl(images[0])} alt="" className={`mg-img ${imagePositions[images[0]] || ''}`.trim()} />}
                <div className="mg-overlay" />
            </div>
            {/* Secondary pair — offset vertically */}
            <div className="md:col-span-5 flex flex-col gap-3 justify-end" style={{ paddingBottom: '0' }}>
                {[1, 2].map((i) => images[i] ? (
                    <div
                        key={i}
                        className={`mg-img-wrap cursor-pointer ${i === 1 ? 'mt-16' : ''}`}
                        onClick={() => onClick(i)}
                        style={{ aspectRatio: '4/3', ...(imageHeights[images[i]] ? { height: imageHeights[images[i]], aspectRatio: 'auto' } : {}) }}
                    >
                        <img src={getImageUrl(images[i])} alt="" className={`mg-img ${imagePositions[images[i]] || ''}`.trim()} />
                        <div className="mg-overlay" />
                    </div>
                ) : null)}
            </div>
        </div>
    ),

    // Layout B: Curated trio — wide landscape top, two portraits below
    (images, onClick, imagePositions = {}, imageHeights = {}) => (
        <div className="flex flex-col gap-3">
            <div
                className="mg-img-wrap cursor-pointer w-full"
                onClick={() => onClick(0)}
                style={{ aspectRatio: '21/9', ...(imageHeights[images[0]] ? { height: imageHeights[images[0]], aspectRatio: 'auto' } : {}) }}
            >
                {images[0] && <img src={getImageUrl(images[0])} alt="" className={`mg-img ${imagePositions[images[0]] || ''}`.trim()} />}
                <div className="mg-overlay" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => images[i] ? (
                    <div
                        key={i}
                        className="mg-img-wrap cursor-pointer"
                        onClick={() => onClick(i)}
                        style={{ aspectRatio: '4/5', ...(imageHeights[images[i]] ? { height: imageHeights[images[i]], aspectRatio: 'auto' } : {}) }}
                    >
                        <img src={getImageUrl(images[i])} alt="" className={`mg-img ${imagePositions[images[i]] || ''}`.trim()} />
                        <div className="mg-overlay" />
                    </div>
                ) : null)}
            </div>
        </div>
    ),

    // Layout C: Full-bleed single — editorial statement image
    (images, onClick, imagePositions = {}, imageHeights = {}) => (
        <div
            className="mg-img-wrap cursor-pointer w-full"
            onClick={() => onClick(0)}
            style={{ height: '90vh', ...(imageHeights[images[0]] ? { height: imageHeights[images[0]], minHeight: imageHeights[images[0]] } : {}) }}
        >
            {images[0] && <img src={getImageUrl(images[0])} alt="" className={`mg-img ${imagePositions[images[0]] || ''}`.trim()} />}
            <div className="mg-overlay" />
        </div>
    ),

    // Layout D: Inverted — two portraits left, massive portrait right
    (images, onClick, imagePositions = {}, imageHeights = {}) => (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3" style={{ minHeight: '88vh' }}>
            <div className="md:col-span-5 flex flex-col gap-3 justify-start" style={{ paddingTop: '3rem' }}>
                {[0, 1].map((i) => images[i] ? (
                    <div
                        key={i}
                        className="mg-img-wrap cursor-pointer"
                        onClick={() => onClick(i)}
                        style={{ aspectRatio: '4/5', flex: 1, ...(imageHeights[images[i]] ? { height: imageHeights[images[i]], aspectRatio: 'auto', flex: 'none' } : {}) }}
                    >
                        <img src={getImageUrl(images[i])} alt="" className={`mg-img ${imagePositions[images[i]] || ''}`.trim()} />
                        <div className="mg-overlay" />
                    </div>
                ) : null)}
            </div>
            <div
                className="md:col-span-7 mg-img-wrap cursor-pointer"
                onClick={() => onClick(2)}
                style={{ minHeight: '80vh', ...(imageHeights[images[2]] ? { height: imageHeights[images[2]], minHeight: imageHeights[images[2]] } : {}) }}
            >
                {images[2] && (
                    <>
                        <img src={getImageUrl(images[2])} alt="" className={`mg-img ${imagePositions[images[2]] || ''}`.trim()} />
                        <div className="mg-overlay" />
                    </>
                )}
            </div>
        </div>
    ),

    // Layout E: Staggered trio — vertical offset cinematic
    (images, onClick, imagePositions = {}, imageHeights = {}) => (
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
            {images[0] && (
                <div
                    className="mg-img-wrap cursor-pointer flex-1"
                    onClick={() => onClick(0)}
                    style={{ aspectRatio: '3/4', marginTop: '3rem', ...(imageHeights[images[0]] ? { height: imageHeights[images[0]], aspectRatio: 'auto' } : {}) }}
                >
                    <img src={getImageUrl(images[0])} alt="" className={`mg-img ${imagePositions[images[0]] || ''}`.trim()} />
                    <div className="mg-overlay" />
                </div>
            )}
            {images[1] && (
                <div
                    className="mg-img-wrap cursor-pointer flex-1"
                    onClick={() => onClick(1)}
                    style={{ aspectRatio: '3/4', marginBottom: '3rem', ...(imageHeights[images[1]] ? { height: imageHeights[images[1]], aspectRatio: 'auto' } : {}) }}
                >
                    <img src={getImageUrl(images[1])} alt="" className={`mg-img ${imagePositions[images[1]] || ''}`.trim()} />
                    <div className="mg-overlay" />
                </div>
            )}
            {images[2] && (
                <div
                    className="mg-img-wrap cursor-pointer flex-1"
                    onClick={() => onClick(2)}
                    style={{ aspectRatio: '3/4', marginTop: '5rem', ...(imageHeights[images[2]] ? { height: imageHeights[images[2]], aspectRatio: 'auto' } : {}) }}
                >
                    <img src={getImageUrl(images[2])} alt="" className={`mg-img ${imagePositions[images[2]] || ''}`.trim()} />
                    <div className="mg-overlay" />
                </div>
            )}
        </div>
    ),
];

// ─── Single page unit ─────────────────────────────────────────────────────────
function MagazinePage({ images, allImages, pageIndex, baseImageIndex, imagePositions, imageHeights }) {
    const ref = useRef(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxStart, setLightboxStart] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) entry.target.classList.add('mg-visible');
            },
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const layoutFn = LAYOUTS[pageIndex % LAYOUTS.length];

    const handleClick = (localIndex) => {
        setLightboxStart(baseImageIndex + localIndex);
        setLightboxOpen(true);
    };

    return (
        <>
            <div ref={ref} className="mg-page-reveal">
                {layoutFn(images, handleClick, imagePositions, imageHeights)}
            </div>
            {lightboxOpen && (
                <GalleryLightbox
                    images={allImages}
                    startIndex={lightboxStart}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
    );
}

const IMAGES_PER_PAGE = [3, 3, 1, 3, 3];

// ─── Main component ───────────────────────────────────────────────────────────
export default function MagazineGrid({ images, imagePositions = {}, imageHeights = {} }) {
    const [loadedPages, setLoadedPages] = useState(3);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setLoadedPages((prev) => prev + 2);
            },
            { rootMargin: '500px' }
        );
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);

    const pages = [];
    let idx = 0;
    let layoutIdx = 0;
    while (idx < images.length) {
        const count = IMAGES_PER_PAGE[layoutIdx % IMAGES_PER_PAGE.length];
        const slice = images.slice(idx, idx + count);
        if (slice.length > 0) pages.push({ images: slice, baseIndex: idx, layoutIdx });
        idx += count;
        layoutIdx++;
    }

    const visiblePages = pages.slice(0, loadedPages);

    return (
        <section id="moments" style={{ background: '#E9E2D6', paddingTop: '0', paddingBottom: '6rem' }}>

            {/* ── Section header ── */}
            <div className="text-center" style={{ padding: '6rem 1.5rem 4rem' }}>
                <p className="font-[Montserrat] text-[8px] tracking-[0.5em] text-[#C9A96E] mb-5 uppercase">
                    ◆ &nbsp; The Collection
                </p>
                <h2
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        lineHeight: 0.9,
                        color: '#0F0F0D',
                        letterSpacing: '-0.02em',
                        marginBottom: '1.5rem',
                    }}
                >
                    Moments
                </h2>
                <div className="flex items-center justify-center gap-5 mt-1">
                    <div className="h-px bg-[#C9A96E]/50 w-16" />
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                            fontStyle: 'italic',
                            color: 'rgba(45,45,45,0.55)',
                            letterSpacing: '0.04em',
                        }}
                    >
                        A life beautifully lived
                    </p>
                    <div className="h-px bg-[#C9A96E]/50 w-16" />
                </div>
            </div>

            {/* ── Photo pages ── */}
            <div style={{ padding: '0 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
                {visiblePages.map((page, i) => (
                    <div key={i}>
                        {/* Generous breathing room between page layouts */}
                        <div style={{ marginBottom: '6rem' }}>
                            <MagazinePage
                                images={page.images}
                                allImages={images}
                                pageIndex={page.layoutIdx}
                                baseImageIndex={page.baseIndex}
                                imagePositions={imagePositions}
                                imageHeights={imageHeights}
                            />
                        </div>

                        {/* Occasional pull quote between spreads */}
                        {i % 4 === 3 && (
                            <div
                                className="text-center mg-page-reveal"
                            // style={{ padding: '4rem 1.5rem', marginBottom: '5rem' }}
                            >
                                {/* horizontal rule */}
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    <div className="h-px bg-[#C9A96E]/40 w-20" />
                                    <span className="text-[#C9A96E] text-xs">◆</span>
                                    <div className="h-px bg-[#C9A96E]/40 w-20" />
                                </div>
                                <p
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                                        fontStyle: 'italic',
                                        fontWeight: 400,
                                        color: '#1A1A1A',
                                        maxWidth: '680px',
                                        margin: '0 auto',
                                        lineHeight: 1.45,
                                    }}
                                >
                                    &ldquo;In every photograph, a universe of feeling —
                                    the warmth of her laughter, the poetry of her presence.&rdquo;
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <div className="h-px bg-[#C9A96E]/40 w-20" />
                                    <span className="text-[#C9A96E] text-xs">◆</span>
                                    <div className="h-px bg-[#C9A96E]/40 w-20" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Infinite scroll sentinel ── */}
            {loadedPages < pages.length && (
                <div ref={sentinelRef} className="flex justify-center py-16">
                    <div className="flex gap-2 items-center">
                        {[0, 150, 300].map((delay) => (
                            <div
                                key={delay}
                                className="rounded-full animate-bounce"
                                style={{ width: '6px', height: '6px', background: '#C9A96E', animationDelay: `${delay}ms` }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ── End ornament ── */}
            {loadedPages >= pages.length && (
                <div className="py-12 text-center">
                    <div className="flex items-center justify-center gap-5 mb-3">
                        <div className="h-px bg-[#C9A96E]/40 w-12" />
                        <span className="text-[#C9A96E] text-xs">◆</span>
                        <div className="h-px bg-[#C9A96E]/40 w-12" />
                    </div>
                    <p className="font-[Montserrat] text-[8px] tracking-[0.45em] text-[#C9A96E]/60 uppercase">
                        End of Collection
                    </p>
                </div>
            )}

            <style>{`
                .mg-img-wrap { position: relative; overflow: hidden; }
                .mg-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); display: block; }
                .mg-img-wrap:hover .mg-img { transform: scale(1.045); }
                .mg-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, rgba(15,15,13,0.7) 0%, transparent 50%);
                    opacity: 0; transition: opacity 0.45s ease;
                }
                .mg-img-wrap:hover .mg-overlay { opacity: 1; }
                .mg-page-reveal { opacity: 0; transform: translateY(32px); transition: opacity 1s ease, transform 1s ease; }
                .mg-page-reveal.mg-visible { opacity: 1; transform: translateY(0); }
            `}</style>
        </section>
    );
}
