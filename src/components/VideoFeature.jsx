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
            style={{ background: '#0A0907', minHeight: '60vh' }}
            className="flex flex-col md:flex-row items-center mt-10"
        >
            {/* ── Left: Text Panel ── */}
            <div
                className="flex-1 flex flex-col justify-center px-10 md:px-20 py-16 md:py-24"
                style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                    minWidth: 0,
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
                        fontSize: 'clamp(2.8rem, 6vw, 6rem)',
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

                {/* Mute toggle */}
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

            {/* ── Right: Video ── */}
            <div className="flex-1 flex items-center justify-center w-full" style={{ minWidth: 0 }}>
                <video
                    ref={videoRef}
                    src={getVideoUrl(video)}
                    muted={muted}
                    loop
                    playsInline
                    preload="metadata"
                    style={{ display: 'block', width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                />
            </div>
        </section>
    );
}
