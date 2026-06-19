'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;
  return (
    <footer className="bg-[#1B3A4B] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <span className="font-serif text-3xl font-bold tracking-widest text-white block">AR</span>
            <span className="text-[#C4622D] text-[9px] tracking-[0.35em] uppercase">Armel Design</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mt-4">
            Tasarım, üretim ve uygulama aşamalarında yanınızdayız.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-white/50 hover:text-[#C4622D] transition-colors text-sm tracking-wider">IG</a>
            <a href="#" className="text-white/50 hover:text-[#C4622D] transition-colors text-sm tracking-wider">LI</a>
            <a href="#" className="text-white/50 hover:text-[#C4622D] transition-colors text-sm tracking-wider">PT</a>
          </div>
        </div>

        {/* Hizmetler */}
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C4622D] mb-5">Hizmetlerimiz</h4>
          <ul className="space-y-3">
            {['İç Mimari Tasarım', 'Konsept Geliştirme', 'Uygulama & Koordinasyon', 'Tadilat & Yenileme'].map((s) => (
              <li key={s}>
                <Link href="/hizmetler" className="text-sm text-white/60 hover:text-white transition-colors">
                  &rsaquo; {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C4622D] mb-5">Kurumsal</h4>
          <ul className="space-y-3">
            {[
              { label: 'Hakkımızda', href: '/hakkimizda' },
              { label: 'Projelerimiz', href: '/projeler' },
              { label: 'İletişim', href: '/iletisim' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                  &rsaquo; {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C4622D] mb-5">İletişim</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li>+90 5XX XXX XX XX</li>
            <li>info@armeldesign.com</li>
            <li>İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 lg:px-10 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-white/30 text-xs tracking-wider">
          © {new Date().getFullYear()} Armel Design. Tüm hakları saklıdır.
        </p>
        <p className="text-white/30 text-xs tracking-wider">
          Gizlilik Politikası &nbsp;|&nbsp; Kullanım Şartları
        </p>
      </div>
    </footer>
  );
}
