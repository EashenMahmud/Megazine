import { useEffect, useRef, useState } from 'react';

export default function Masthead() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#F5F0E8]/95 backdrop-blur-md shadow-sm border-b border-[#C9A96E]/30'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {['COVER', 'EDITORIAL', 'MOMENTS', 'FILM'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`font-[Montserrat] text-[10px] tracking-[0.2em] font-medium transition-colors duration-300 masthead-border pb-0.5 ${scrolled ? 'text-[#1A1A1A] hover:text-[#C9A96E]' : 'text-white hover:text-[#C9A96E]'
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Center logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1
                        className={`font-[\'Playfair_Display\'] font-black tracking-[0.15em] transition-all duration-500 ${scrolled ? 'text-[#1A1A1A] text-2xl' : 'text-white text-3xl'
                            }`}
                        style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2em' }}
                    >
                        SUMIYA
                    </h1>
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-6">
                    <span
                        className={`font-[Montserrat] text-[10px] tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-[#C9A96E]' : 'text-[#C9A96E]'
                            }`}
                    >
                        ✦ LOVE EDITION
                    </span>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`block h-px w-6 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1A]' : 'bg-white'
                                } ${menuOpen && i === 0 ? 'rotate-45 translate-y-2' : ''} ${menuOpen && i === 1 ? 'opacity-0' : ''
                                } ${menuOpen && i === 2 ? '-rotate-45 -translate-y-2' : ''}`}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#F5F0E8]/98 backdrop-blur-md border-t border-[#C9A96E]/20 py-6">
                    <nav className="flex flex-col items-center gap-6">
                        {['COVER', 'EDITORIAL', 'MOMENTS', 'FILM'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                className="font-[Montserrat] text-[11px] tracking-[0.25em] text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
