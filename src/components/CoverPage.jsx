import { useEffect, useRef } from 'react';
import { getImageUrl } from '../assets';

export default function CoverPage({ image }) {
    const imgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current) {
                const scrollY = window.scrollY;
                imgRef.current.style.transform = `scale(1.08) translateY(${scrollY * 0.4}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="cover"
            className="relative h-screen min-h-[700px] overflow-hidden flex items-end"
        >
            {/* Background image with parallax */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    ref={imgRef}
                    src={getImageUrl(image)}
                    alt="Cover"
                    className="w-full h-[200%] object-cover animate-ken-burns origin-center"
                    style={{ transform: 'scale(1.08)' }}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-10 pb-20 md:px-20">
                {/* Issue label */}
                <p
                    className="font-[Montserrat] text-[10px] tracking-[0.35em] text-[#C9A96E] mb-4 animate-fade-in"
                    style={{ animationDelay: '0.2s', animationFillMode: 'both', opacity: 0 }}
                >
                    ✦ &nbsp; LOVE EDITION &nbsp; ✦ &nbsp; VOLUME I
                </p>

                {/* Main title */}
                <h1
                    className="font-['Playfair_Display'] text-white leading-none mb-4 animate-fade-in-up"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(5rem, 15vw, 13rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        animationDelay: '0.4s',
                        animationFillMode: 'both',
                        opacity: 0,
                    }}
                >
                    SUMIYA
                </h1>

                {/* Subtitle */}
                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.7s', animationFillMode: 'both', opacity: 0 }}
                >
                    <div className="flex items-center gap-4 mb-3">
                        <div className="h-px bg-[#C9A96E] w-12" />
                        <p
                            className="font-['Cormorant_Garamond'] italic text-[#EDD5C5] text-xl md:text-2xl tracking-wide"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            A Portrait of Radiance
                        </p>
                        <div className="h-px bg-[#C9A96E] w-12" />
                    </div>
                    <p
                        className="font-[Montserrat] text-white/60 text-[10px] tracking-[0.3em] uppercase"
                    >
                        With love &mdash; an eternal collection
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 right-10 flex flex-col items-center gap-2 animate-float"
            >
                <span
                    className="font-[Montserrat] text-[9px] tracking-[0.3em] text-white/50 rotate-90 origin-center"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    SCROLL
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" />
            </div>

            {/* Bottom border decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />
        </section>
    );
}
