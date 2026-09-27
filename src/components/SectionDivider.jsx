import { useEffect, useRef } from 'react';

export default function SectionDivider({ label, title, subtitle }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    ref.current?.querySelectorAll('.sd-reveal').forEach((el, i) => {
                        setTimeout(() => el.classList.add('sd-visible'), i * 120);
                    });
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="relative overflow-hidden"
            style={{ background: '#E8E1D5', paddingTop: '8rem', paddingBottom: '8rem' }}
        >
            {/* Thin top rule */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-[#C9A96E]/30" />

            <div className="relative max-w-5xl mx-auto px-6 text-center">
                {/* Label */}
                <p className="sd-reveal font-[Montserrat] text-[9px] tracking-[0.45em] text-[#C9A96E] uppercase mb-6"
                    style={{ letterSpacing: '0.45em' }}>
                    {label}
                </p>

                {/* Title — large, ink-dark, high contrast */}
                <h2
                    className="sd-reveal leading-none text-[#0F0F0D] mb-5"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        fontStyle: 'italic',
                    }}
                >
                    {title}
                </h2>

                {/* Ornamental rule */}
                <div className="sd-reveal flex items-center justify-center gap-5 mb-5">
                    <div className="h-px bg-[#C9A96E]/60 w-20" />
                    <span className="text-[#C9A96E] text-xs">◆</span>
                    <div className="h-px bg-[#C9A96E]/60 w-20" />
                </div>

                {subtitle && (
                    <p
                        className="sd-reveal text-[#2D2D2D]/55"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                            fontStyle: 'italic',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Thin bottom rule */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-[#C9A96E]/30" />

            <style>{`
                .sd-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.9s ease, transform 0.9s ease; }
                .sd-reveal.sd-visible { opacity: 1; transform: translateY(0); }
            `}</style>
        </div>
    );
}
