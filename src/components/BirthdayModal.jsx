import { useState, useEffect, useRef, useMemo } from 'react';

const STORAGE_KEY = 'sumiya_birthday_visited';
const AUTO_CLOSE_SEC = 10;

const CONFETTI_COLORS = ['#C9A96E', '#f5a7c7', '#a8d8ea', '#f9e04b', '#b5ead7', '#ff9aa2', '#ffdac1', '#e2f0cb'];
const CONFETTI_COUNT = 70;

function Confetti() {
    const pieces = useMemo(() => Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: `${6 + Math.random() * 8}px`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${2.5 + Math.random() * 2}s`,
        rotation: `${Math.random() * 360}deg`,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
            {pieces.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        borderRadius: p.shape === 'circle' ? '50%' : '2px',
                        transform: `rotate(${p.rotation})`,
                        animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    );
}

export default function BirthdayModal() {
    const [visible, setVisible] = useState(true);
    const [letterOpen, setLetterOpen] = useState(false);

    const handleClose = () => setVisible(false);

    if (!visible) return null;

    return (
        <>
            <Confetti />
            {/* ── Backdrop ── */}
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                style={{ background: 'rgba(10,9,7,0.82)', backdropFilter: 'blur(6px)' }}
            >
                {/* ── Main Card ── */}
                <div
                    className="relative flex flex-col items-center text-center px-10 py-14 rounded-none"
                    style={{
                        background: 'linear-gradient(160deg, #fdf8f1 0%, #f5ece0 100%)',
                        maxWidth: '680px',
                        width: '90vw',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
                        animation: 'bmFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) both',
                    }}
                >
                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-5 flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Close"
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1.5px solid #C9A96E',
                            background: 'rgba(201,169,110,0.1)',
                            color: '#C9A96E',
                            fontSize: '16px',
                            fontWeight: 400,
                            cursor: 'pointer',
                        }}
                    >
                        ✕
                    </button>

                    {/* Gold diamond ornament */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10 bg-[#C9A96E]/40" />
                        <span style={{ color: '#C9A96E', fontSize: '10px' }}>◆</span>
                        <div className="h-px w-10 bg-[#C9A96E]/40" />
                    </div>

                    {/* Cake emoji */}
                    <div style={{ fontSize: '3.2rem', marginBottom: '1rem', animation: 'bmBounce 1.8s ease-in-out infinite' }}>
                        🎂
                    </div>

                    {/* Label */}
                    <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '9px',
                        letterSpacing: '0.5em',
                        color: '#C9A96E',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        A Special Day · Vol. I
                    </p>

                    {/* Main heading */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.2rem, 6vw, 3.6rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: '#1a1209',
                        lineHeight: 1.1,
                        marginBottom: '1.2rem',
                    }}>
                        Happy Birthday,<br />Sumiya
                    </h1>

                    {/* Sub message */}
                    <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                        fontStyle: 'italic',
                        color: '#6b5740',
                        lineHeight: 1.6,
                        maxWidth: '380px',
                        marginBottom: '2.2rem',
                    }}>
                        This page exists only for you — a small collection of frames,
                        feelings, and all the love I have, placed somewhere you can always return to.
                    </p>

                    {/* Animated letter icon */}
                    <button
                        onClick={() => setLetterOpen(true)}
                        className="flex flex-col items-center gap-3 group"
                        aria-label="Open birthday letter"
                        style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                        <div style={{ fontSize: '4rem', animation: 'bmLetterBounce 1.2s ease-in-out infinite' }}>
                            💌
                        </div>
                        <span style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '11px',
                            letterSpacing: '0.3em',
                            color: '#C9A96E',
                            textTransform: 'uppercase',
                            borderBottom: '1px solid rgba(201,169,110,0.4)',
                            paddingBottom: '3px',
                        }}>
                            Open your letter
                        </span>
                    </button>

                    {/* Bottom ornament */}
                    <div className="flex items-center gap-3 mt-8">
                        <div className="h-px w-10 bg-[#C9A96E]/40" />
                        <span style={{ color: '#C9A96E', fontSize: '10px' }}>◆</span>
                        <div className="h-px w-10 bg-[#C9A96E]/40" />
                    </div>
                </div>
            </div>

            {/* ── Letter Overlay ── */}
            {letterOpen && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
                    style={{ background: 'rgba(10,9,7,0.88)', backdropFilter: 'blur(8px)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setLetterOpen(false); }}
                >
                    <div
                        style={{
                            background: '#f7f0e6',
                            backgroundImage: `radial-gradient(ellipse at 20% 10%, rgba(255,248,230,0.9) 0%, transparent 60%),
                                             radial-gradient(ellipse at 80% 90%, rgba(220,195,160,0.4) 0%, transparent 60%)`,
                            maxWidth: '640px',
                            width: '92vw',
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            padding: '3.5rem 3.5rem 3rem',
                            boxShadow: '0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(201,169,110,0.25)',
                            animation: 'bmLetterOpen 0.5s cubic-bezier(0.22,1,0.36,1) both',
                            position: 'relative',
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => { setLetterOpen(false); handleClose(); }}
                            className="absolute top-4 right-5 flex items-center justify-center transition-all hover:scale-110"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '1.5px solid #C9A96E',
                                background: 'rgba(201,169,110,0.1)',
                                color: '#C9A96E',
                                fontSize: '16px',
                                cursor: 'pointer',
                            }}
                        >
                            ✕
                        </button>

                        {/* Date stamp */}
                        <p style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '9px',
                            letterSpacing: '0.3em',
                            color: '#C9A96E',
                            textTransform: 'uppercase',
                            marginBottom: '2rem',
                        }}>
                            September 2026 · Dhaka
                        </p>

                        {/* Salutation */}
                        <p style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                            fontStyle: 'italic',
                            color: '#1a1209',
                            marginBottom: '1.8rem',
                            lineHeight: 1.3,
                        }}>
                            Dear Sumiya,
                        </p>

                        {/* Body */}
                        {[
                            `Every single day, I find myself thinking about you constantly hoping that if I keep you in my thoughts all day long, you might visit me in my dreams at night. I miss you more than words can say.`,
                            `Falling in love with you was the easiest thing I have ever done. In a world full of noise, nothing truly matters to me but you, and every day that I am alive, I am reminded of this truth.`,
                            `I loved you the day I first met you, I love you today, and I promise to love you for the rest of my life.`,
                        ].map((para, i) => (
                            <p key={i} style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(1.05rem, 2.2vw, 1.22rem)',
                                lineHeight: 2,
                                color: '#2d200f',
                                marginBottom: '1.4rem',
                            }}>
                                {para}
                            </p>
                        ))}

                        {/* Sign-off */}
                        <div style={{ marginTop: '2rem' }}>
                            <p style={{
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic',
                                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                                color: '#1a1209',
                                marginBottom: '0.3rem',
                            }}>
                                With all my love,
                            </p>
                            <p style={{
                                fontFamily: "'Playfair Display', serif",
                                fontStyle: 'italic',
                                fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                                color: '#C9A96E',
                                fontWeight: 400,
                            }}>
                                Akib 💛
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes bmFadeIn {
                    from { opacity: 0; transform: translateY(28px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
                @keyframes bmBounce {
                    0%, 100% { transform: translateY(0);   }
                    50%      { transform: translateY(-8px); }
                }
                @keyframes bmLetterBounce {
                    0%, 100% { transform: translateY(0) rotate(-5deg) scale(1);    }
                    50%      { transform: translateY(-10px) rotate(5deg) scale(1.1); }
                }
                @keyframes bmLetterOpen {
                    from { opacity: 0; transform: scale(0.88) translateY(30px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);    }
                }
                @keyframes confettiFall {
                    0%   { opacity: 1; transform: translateY(0)     rotate(0deg)   scaleX(1); }
                    25%  { opacity: 1; transform: translateY(25vh)  rotate(180deg) scaleX(-1); }
                    75%  { opacity: 0.8; transform: translateY(75vh) rotate(360deg) scaleX(1); }
                    100% { opacity: 0; transform: translateY(110vh) rotate(540deg) scaleX(-1); }
                }
            `}</style>
        </>
    );
}
