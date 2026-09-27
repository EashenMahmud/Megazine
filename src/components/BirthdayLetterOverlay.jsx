export default function BirthdayLetterOverlay({ onClose }) {
    return (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            style={{ background: 'rgba(10,9,7,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
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
                    onClick={onClose}
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
            {/* ── Keyframes (duplicated here so it works independently) ── */}
            <style>{`
                @keyframes bmLetterOpen {
                    from { opacity: 0; transform: scale(0.88) translateY(30px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);    }
                }
            `}</style>
        </div>
    );
}
