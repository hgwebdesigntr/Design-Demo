'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      {/* Floating pill container */}
      <nav
        className={`max-w-7xl mx-auto bg-[#1B3A4B] rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/40' : 'shadow-lg shadow-black/20'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#C4622D] flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-white text-sm font-bold leading-none">AR</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white text-sm font-semibold tracking-wide">Armel Design</span>
            <span className="text-white/40 text-[8px] tracking-[0.3em] uppercase">İç Mimarlık</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-xl text-[11px] tracking-wider transition-colors ${
                pathname === l.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="hidden md:inline-flex items-center gap-2.5 bg-white text-[#1B3A4B] text-[10px] tracking-[0.2em] uppercase font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C4622D] hover:text-white transition-colors group"
          >
            <span className="w-5 h-5 rounded-lg bg-[#1B3A4B] group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 5h6M5 2l3 3-3 3" className="text-white" />
              </svg>
            </span>
            Teklif Al
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-colors"
            aria-label="Menü"
          >
            {open ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 1h16M0 6h16M0 11h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 bg-[#1B3A4B] rounded-2xl px-5 py-5 flex flex-col gap-1 shadow-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm tracking-wider transition-colors ${
                pathname === l.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-4">
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#C4622D] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-6 py-3 rounded-xl hover:bg-[#a8522a] transition-colors"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
