import { useState, useEffect } from 'react';
import { getImageUrl } from '../assets';

export default function PersonalCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance every 3.5 seconds
    useEffect(() => {
        if (!images || images.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500);

        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) return null;

    // Helper to get wrap-around indices safely
    const getIndex = (offset) => {
        return (currentIndex + offset + images.length) % images.length;
    };

    return (
        <section className="py-24 overflow-hidden relative" style={{ background: '#E9E2D6' }}>
            {/* Title / Header */}
            <div className="text-center mb-16">
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
            <div className="flex items-center justify-center gap-4 md:gap-8 max-w-[1400px] mx-auto px-4 h-[60vh] md:h-[75vh]">

                {/* Left Image (Previous) */}
                <div
                    className="flex-1 h-[75%] transition-all duration-700 ease-in-out opacity-60 overflow-hidden cursor-pointer hover:opacity-80"
                    onClick={() => setCurrentIndex(getIndex(-1))}
                >
                    <img
                        src={getImageUrl(images[getIndex(-1)])}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>

                {/* Center Image (Current) */}
                <div className="flex-[1.1] md:flex-[1.3] h-full transition-all duration-700 ease-in-out shadow-[0_30px_60px_rgba(0,0,0,0.25)] z-10 overflow-hidden">
                    <img
                        src={getImageUrl(images[currentIndex])}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Image (Next) */}
                <div
                    className="flex-1 h-[75%] transition-all duration-700 ease-in-out opacity-60 overflow-hidden cursor-pointer hover:opacity-80"
                    onClick={() => setCurrentIndex(getIndex(1))}
                >
                    <img
                        src={getImageUrl(images[getIndex(1)])}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>

            </div>

            {/* Simple dot indicators */}
            <div className="flex justify-center gap-3 mt-12">
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
