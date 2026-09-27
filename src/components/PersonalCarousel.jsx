import { useState, useEffect } from 'react';
import { getImageUrl } from '../assets';

export default function PersonalCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance every 3.5 seconds
    useEffect(() => {
        if (!images || images.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <section className="py-24 overflow-hidden relative" style={{ background: '#E9E2D6' }}>
            {/* Title / Header */}
            <div className="text-center mb-32">
                <p className="font-[Montserrat] text-[8px] tracking-[0.5em] text-[#C9A96E] mb-5 uppercase">
                    ◆ &nbsp; Personal Archives
                </p>
                <h2
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        lineHeight: 0.9,
                        color: '#0F0F0D',
                        letterSpacing: '-0.02em',
                    }}
                >
                    A beautiful memory
                </h2>
            </div>

            {/* Carousel Container */}
            <div
                className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center overflow-visible mt-20"
                style={{ height: '70vh' }}
            >
                {images.map((img, idx) => {
                    let diff = (idx - currentIndex + images.length) % images.length;
                    if (diff > Math.floor(images.length / 2)) {
                        diff -= images.length;
                    }

                    // CSS transition styles for buttery smooth 3D carousel effect
                    let styleClasses = "absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ";

                    let inlineStyles = {
                        width: 'clamp(280px, 30vw, 400px)',
                        height: '100%',
                        transform: 'translateX(300%) scale(0.5)',
                        opacity: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                    };

                    if (diff === 0) {
                        inlineStyles.transform = 'translateX(0%) scale(1)'; // Center image scaled to box exactly
                        inlineStyles.opacity = 1;
                        inlineStyles.zIndex = 30;
                        inlineStyles.pointerEvents = 'auto';
                    } else if (diff === -1) {
                        inlineStyles.transform = 'translateX(-120%) scale(0.70)'; // Smaller sides
                        inlineStyles.opacity = 0.65;
                        inlineStyles.zIndex = 20;
                        inlineStyles.pointerEvents = 'auto';
                    } else if (diff === 1) {
                        inlineStyles.transform = 'translateX(120%) scale(0.70)';
                        inlineStyles.opacity = 0.65;
                        inlineStyles.zIndex = 20;
                        inlineStyles.pointerEvents = 'auto';
                    } else if (diff === -2) {
                        inlineStyles.transform = 'translateX(-220%) scale(0.5)';
                        inlineStyles.opacity = 0;
                        inlineStyles.zIndex = 10;
                    } else if (diff === 2) {
                        inlineStyles.transform = 'translateX(220%) scale(0.5)';
                        inlineStyles.opacity = 0;
                        inlineStyles.zIndex = 10;
                    } else if (diff < 0) {
                        inlineStyles.transform = 'translateX(-300%) scale(0.5)';
                    }

                    return (
                        <div
                            key={idx}
                            className={styleClasses}
                            style={inlineStyles}
                            onClick={() => {
                                if (diff !== 0) setCurrentIndex(idx);
                            }}
                        >
                            <img
                                src={getImageUrl(img)}
                                alt=""
                                className="w-full h-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                style={{
                                    boxShadow: diff === 0 ? '0 30px 60px rgba(0,0,0,0.45)' : '0 15px 35px rgba(0,0,0,0.2)'
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Simple dot indicators */}
            <div className="flex justify-center gap-3 mt-20">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-500 rounded-full ${currentIndex === idx
                            ? 'w-8 h-1.5 bg-[#C9A96E]'
                            : 'w-1.5 h-1.5 bg-[#C9A96E]/30 hover:bg-[#C9A96E]/70'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
