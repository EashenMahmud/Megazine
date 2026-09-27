import { useEffect, useRef } from 'react';
import { getImageUrl } from '../assets';

export default function PhotoStory({ image, caption, issue, imagePosition = '', height = '92vh' }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    ref.current?.querySelectorAll('.ps-reveal').forEach((el, i) => {
                        setTimeout(() => el.classList.add('ps-visible'), i * 200);
                    });
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0A0907]" style={{ height }}>
            {/* Full-bleed image with slow zoom */}
            <div className="absolute inset-0 ps-zoom-wrap">
                <img
                    src={getImageUrl(image)}
                    alt=""
                    className={`w-full h-full object-cover ps-zoom-img ${imagePosition}`.trim()}
                />
                {/* Layered gradient: bottom and very subtle top vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(15,15,13,0.80) 0%, rgba(15,15,13,0.2) 40%, transparent 70%)',
                    }}
                />
                {/* Horizontal edge vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(10,9,7,0.35) 100%)',
                    }}
                />
            </div>

            {/* Lower caption area */}
            <div className="absolute bottom-0 left-0 right-0 px-10 md:px-20 pb-14 md:pb-18">
                {/* Issue badge */}
                <div className="ps-reveal flex items-center gap-3 mb-5">
                    <div className="h-px bg-[#C9A96E] w-8" />
                    <span className="font-[Montserrat] text-[8px] tracking-[0.4em] text-[#C9A96E] uppercase">
                        {issue}
                    </span>
                </div>

                {/* Caption quote */}
                <p
                    className="ps-reveal text-white leading-snug"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.7rem, 4vw, 3.8rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        maxWidth: '720px',
                        lineHeight: 1.2,
                    }}
                >
                    &ldquo;{caption}&rdquo;
                </p>

                {/* Thin bottom rule */}
                <div className="ps-reveal mt-8 h-px bg-white/15 max-w-xs" />
            </div>

            {/* Right side vertical label */}
            <div
                className="absolute top-1/2 right-8 md:right-12 -translate-y-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-px bg-[#C9A96E]/35" style={{ height: '64px' }} />
                <span
                    className="font-[Montserrat] text-[7px] tracking-[0.5em] text-white/30 uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    PORTRAIT
                </span>
                <div className="w-px bg-[#C9A96E]/35" style={{ height: '64px' }} />
            </div>

            <style>{`
                .ps-reveal { opacity: 0; transform: translateY(22px); transition: opacity 1s ease, transform 1s ease; }
                .ps-reveal.ps-visible { opacity: 1; transform: translateY(0); }
                .ps-zoom-wrap { overflow: hidden; }
                .ps-zoom-img { transition: transform 14s ease-in-out; transform: scale(1.06); }
                .ps-zoom-wrap:hover .ps-zoom-img { transform: scale(1.0); }
            `}</style>
        </section>
    );
}
