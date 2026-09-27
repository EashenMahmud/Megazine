import { useEffect, useRef, useState } from 'react';
import { getVideoUrl } from '../assets';

export default function VideoFeature({ video, title, subtitle }) {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const [muted, setMuted] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setRevealed(entry.isIntersecting);
                if (entry.isIntersecting) {
                    videoRef.current?.play().then(() => setPlaying(true)).catch(() => { });
                } else {
                    videoRef.current?.pause();
                    setPlaying(false);
                }
            },
            { threshold: 0.35 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden flex items-end"
            style={{ height: '100vh', minHeight: '600px' }}
        >
            {/* Video background */}
            <video
                ref={videoRef}
                src={getVideoUrl(video)}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlays: rich gradient from left + bottom */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, rgba(10,9,7,0.78) 0%, rgba(10,9,7,0.3) 55%, transparent 100%)',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(10,9,7,0.6) 0%, transparent 45%)',
                }}
            />

            {/* Film grain texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                }}
            />

            {/* Content — lower-left anchored */}
            <div
                className="relative z-10 px-10 md:px-20 pb-16 md:pb-24 w-full max-w-3xl"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                }}
            >
                {/* Label */}
                <p className="font-[Montserrat] text-[8px] tracking-[0.45em] text-[#C9A96E] mb-5 uppercase">
                    ◆ &nbsp; Captured on Film
                </p>

                {/* Title */}
                <h2
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.8rem, 8vw, 7.5rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        lineHeight: 1,
                        color: '#F5F2EC',
                        letterSpacing: '-0.02em',
                        marginBottom: '1.25rem',
                    }}
                >
                    {title}
                </h2>

                {/* Subtitle */}
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                        fontStyle: 'italic',
                        color: 'rgba(245,242,236,0.65)',
                        marginBottom: '2.5rem',
                        letterSpacing: '0.02em',
                    }}
                >
                    {subtitle}
                </p>

                {/* Mute toggle — minimal borderless design */}
                <button
                    onClick={toggleMute}
                    className="flex items-center gap-4 group"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                    <span
                        className="flex items-center justify-center"
                        style={{
                            width: '44px',
                            height: '44px',
                            border: '1px solid rgba(201,169,110,0.5)',
                            borderRadius: '50%',
                            transition: 'border-color 0.3s ease',
                            color: '#C9A96E',
                            fontSize: '16px',
                        }}
                    >
                        {muted ? '🔇' : '🔊'}
                    </span>
                    <span className="font-[Montserrat] text-[9px] tracking-[0.3em] text-white/50 group-hover:text-[#C9A96E] transition-colors uppercase">
                        {muted ? 'Unmute' : 'Mute'}
                    </span>
                </button>
            </div>

            {/* Issue badge — top right */}
            <div
                className="absolute top-10 right-10 flex flex-col items-center gap-2"
                style={{
                    opacity: revealed ? 1 : 0,
                    transition: 'opacity 1s ease 0.5s',
                }}
            >
                <div className="w-px bg-[#C9A96E]/30" style={{ height: '48px' }} />
                <span
                    className="font-[Montserrat] text-[7px] tracking-[0.45em] text-[#C9A96E]/50 uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    MOTION PICTURE
                </span>
                <div className="w-px bg-[#C9A96E]/30" style={{ height: '48px' }} />
            </div>
        </section>
    );
}
