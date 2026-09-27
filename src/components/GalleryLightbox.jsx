import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../assets';

export default function GalleryLightbox({ images, onClose, startIndex = 0 }) {
    const [current, setCurrent] = useState(startIndex);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length);
            if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [images.length, onClose]);

    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () => setCurrent((c) => (c + 1) % images.length);

    return (
        <div
            className="lightbox-backdrop"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-8 text-white/60 hover:text-white transition-colors text-4xl font-light z-10"
            >
                ×
            </button>

            {/* Prev */}
            <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A96E] transition-colors z-10 p-3"
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 6L10 16L20 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center px-16 md:px-24 py-16">
                <img
                    key={current}
                    src={getImageUrl(images[current])}
                    alt=""
                    className="max-w-full max-h-full object-contain animate-fade-in shadow-2xl"
                    style={{ maxHeight: '85vh' }}
                />
            </div>

            {/* Next */}
            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A96E] transition-colors z-10 p-3"
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M12 6L22 16L12 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <p
                    className="font-[Montserrat] text-[10px] tracking-[0.3em] text-white/40"
                >
                    {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </p>
            </div>

            {/* Dot navigation */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${i === current ? 'bg-[#C9A96E] w-4' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
