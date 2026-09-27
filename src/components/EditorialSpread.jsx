import { useEffect, useRef } from 'react';
import { getImageUrl } from '../assets';

export default function EditorialSpread({ images, quote, author, reverse = false }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.es-reveal').forEach((el, i) => {
                            setTimeout(() => el.classList.add('es-visible'), i * 160);
                        });
                    }
                });
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[90vh] overflow-hidden`}
            style={{ background: '#EDE8E0' }}
        >
            {/* ─── Images column ─── */}
            <div
                className={`w-full md:w-[58%] flex overflow-hidden ${images.length > 1 ? 'gap-0' : ''}`}
                style={{ minHeight: '70vh' }}
            >
                {images.length === 1 && (
                    <div className="es-reveal editorial-img-wrap w-full">
                        <img src={getImageUrl(images[0])} alt="" className="editorial-img" />
                    </div>
                )}

                {images.length === 2 && (
                    <>
                        {/* Tall primary */}
                        <div className="es-reveal editorial-img-wrap flex-[3]" style={{ minHeight: '70vh' }}>
                            <img src={getImageUrl(images[0])} alt="" className="editorial-img" />
                        </div>
                        {/* Offset secondary — pushed down for asymmetry */}
                        <div className="es-reveal editorial-img-wrap flex-[2] mt-16 mb-0" style={{ alignSelf: 'flex-end', minHeight: '55vh' }}>
                            <img src={getImageUrl(images[1])} alt="" className="editorial-img" />
                        </div>
                    </>
                )}

                {images.length >= 3 && (
                    <div className="w-full grid grid-cols-2" style={{ gridTemplateRows: 'auto auto' }}>
                        {/* Large top-left spanning two rows */}
                        <div className="es-reveal editorial-img-wrap row-span-2 col-span-1" style={{ minHeight: '70vh' }}>
                            <img src={getImageUrl(images[0])} alt="" className="editorial-img" />
                        </div>
                        <div className="es-reveal editorial-img-wrap col-span-1" style={{ minHeight: '35vh' }}>
                            <img src={getImageUrl(images[1])} alt="" className="editorial-img" />
                        </div>
                        <div className="es-reveal editorial-img-wrap col-span-1 mt-1" style={{ minHeight: '35vh' }}>
                            <img src={getImageUrl(images[2])} alt="" className="editorial-img" />
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Text column ─── */}
            <div
                className={`w-full md:w-[42%] flex flex-col justify-center px-10 md:px-16 py-20 md:py-32`}
                style={{ background: '#EAE4D8' }}
            >
                {/* Issue tag */}
                <div className="es-reveal flex items-center gap-3 mb-10">
                    <div className="h-px bg-[#C9A96E] w-10" />
                    <span className="font-[Montserrat] text-[8px] tracking-[0.45em] text-[#C9A96E] uppercase">
                        Editorial
                    </span>
                </div>

                {/* Italic large quote */}
                <blockquote
                    className="es-reveal text-[#0F0F0D] mb-8"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                    }}
                >
                    &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author line */}
                <div className="es-reveal mb-12">
                    <span
                        className="font-[Montserrat] text-[9px] tracking-[0.35em] text-[#C9A96E] uppercase"
                    >
                        — {author}
                    </span>
                </div>

                {/* Body copy */}
                <p
                    className="es-reveal text-[#2D2D2D]/65 leading-relaxed mb-12"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                        lineHeight: 1.85,
                    }}
                >
                    She moves through the world like light through stained glass —
                    painting everything she touches with colour, warmth, and an
                    effortless grace that takes your breath away.
                </p>

                {/* Thin rule */}
                <div className="es-reveal h-px bg-[#C9A96E]/30 w-full" />


            </div>

            <style>{`
                .es-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
                .es-reveal.es-visible { opacity: 1; transform: translateY(0); }
                .editorial-img-wrap { overflow: hidden; position: relative; }
                .editorial-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
                .editorial-img-wrap:hover .editorial-img { transform: scale(1.04); }
            `}</style>
        </section>
    );
}
