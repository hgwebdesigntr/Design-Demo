'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ServicesSlider.module.css';

/* ── İkonlar ── */
function IconInterior() {
  return (
    <svg width="22" height="22" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 44V24L26 10L46 24V44" /><path d="M18 44V32H34V44" /><circle cx="26" cy="20" r="3" />
    </svg>
  );
}
function IconConcept() {
  return (
    <svg width="22" height="22" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="26" cy="21" r="10" /><path d="M21 31Q20 38 26 40Q32 38 31 31" />
      <line x1="26" y1="40" x2="26" y2="45" /><line x1="22" y1="45" x2="30" y2="45" />
    </svg>
  );
}
function IconApplication() {
  return (
    <svg width="22" height="22" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="36" height="40" rx="3" />
      <line x1="15" y1="18" x2="37" y2="18" /><line x1="15" y1="25" x2="37" y2="25" /><line x1="15" y1="32" x2="28" y2="32" />
      <circle cx="36" cy="38" r="7" /><path d="M33 38L35 40L39 36" />
    </svg>
  );
}
function IconRenovation() {
  return (
    <svg width="22" height="22" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 8L44 16L20 42L8 42L8 30Z" /><path d="M30 14L38 22" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  interior:    <IconInterior />,
  concept:     <IconConcept />,
  application: <IconApplication />,
  renovation:  <IconRenovation />,
};

export interface ServiceData {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  categoryLabel?: string;
  slug?: string;
  image?: { asset: { url: string } };
}

export interface ServicesSectionData {
  bgImage?: { asset: { url: string } };
  tag?: string;
  heading?: string;
  subheading?: string;
}

const GAP     = 24;
const VISIBLE = 3;

export default function ServicesSlider({
  services,
  section,
}: {
  services: ServiceData[];
  section: ServicesSectionData | null;
}) {
  const router       = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [cardWidth,    setCardWidth]    = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDelta,    setDragDelta]    = useState(0);
  const [isDragging,   setIsDragging]   = useState(false);
  const [hoveredId,    setHoveredId]    = useState<string | null>(null);

  const startXRef   = useRef(0);
  const dragDistRef = useRef(0);

  const maxIndex = Math.max(0, services.length - VISIBLE);

  useEffect(() => {
    const compute = () => {
      if (containerRef.current) {
        setCardWidth((containerRef.current.clientWidth - (VISIBLE - 1) * GAP) / VISIBLE);
      }
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const step = cardWidth + GAP;

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(Math.max(0, Math.min(maxIndex, idx)));
      setDragDelta(0);
    },
    [maxIndex]
  );

  const goPrev = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragDistRef.current = 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    dragDistRef.current = Math.abs(dx);
    setDragDelta(dx);
  };
  const onMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (step > 0) goTo(Math.round((currentIndex * step - dragDelta) / step));
  }, [isDragging, step, currentIndex, dragDelta, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    dragDistRef.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startXRef.current;
    dragDistRef.current = Math.abs(dx);
    setDragDelta(dx);
  };
  const onTouchEnd = () => {
    if (step > 0) goTo(Math.round((currentIndex * step - dragDelta) / step));
  };

  const handleCardClick = (slug?: string) => {
    if (dragDistRef.current > 8 || !slug) return;
    router.push(`/hizmetler/${slug}`);
  };

  const translate = cardWidth > 0 ? -(currentIndex * step) + dragDelta : 0;
  const bgUrl     = section?.bgImage?.asset?.url;

  return (
    <section className="relative overflow-hidden py-20">
      {bgUrl ? (
        <Image src={bgUrl} alt="" fill className="object-cover" priority />
      ) : (
        <div className="absolute inset-0 bg-[#1a2e22]" />
      )}
      <div className="absolute inset-0 bg-black/58" />

      <div className="relative z-10">
        {/* Bölüm başlığı */}
        <div className="text-center mb-12 px-6">
          {section?.tag && (
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4 flex items-center justify-center gap-3">
              <span className="text-white/30">×</span> {section.tag}
            </p>
          )}
          {section?.heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              {section.heading}
            </h2>
          )}
          {section?.subheading && (
            <p className="text-white/55 text-base max-w-md mx-auto">{section.subheading}</p>
          )}
        </div>

        {/* Slider — max 1200px, ortalanmış */}
        <div className="max-w-300 mx-auto px-6 lg:px-10">
          <div
            ref={containerRef}
            className={`${styles.container} ${cardWidth > 0 ? '' : 'invisible'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`${styles.track} ${isDragging ? '' : styles.trackAnimated}`}
              style={{ transform: `translateX(${translate}px)` }}
            >
              {services.map((service) => {
                const hovered = hoveredId === service._id;
                return (
                  <div
                    key={service._id}
                    className={styles.card}
                    style={{ width: cardWidth }}
                    onClick={() => handleCardClick(service.slug)}
                    onMouseEnter={() => setHoveredId(service._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {service.image?.asset?.url && (
                      <Image
                        src={service.image.asset.url}
                        alt={service.title}
                        fill
                        className={`${styles.cardImage} ${hovered ? styles.cardImageVisible : ''}`}
                        draggable={false}
                        sizes="400px"
                      />
                    )}

                    <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`} />

                    <div className="absolute top-6 left-6 z-30 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#1B3A4B]">
                      {iconMap[service.icon ?? ''] ?? <IconInterior />}
                    </div>

                    {service.categoryLabel && (
                      <div className={`${styles.categoryLabel} ${hovered ? styles.categoryLabelHidden : ''}`}>
                        <span className={styles.categoryText}>{service.categoryLabel}</span>
                      </div>
                    )}

                    <div className={`${styles.contentBox} ${hovered ? styles.contentBoxHidden : ''}`}>
                      <h3 className={styles.contentTitle}>{service.title}</h3>
                      {service.description && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-gray-700 text-sm mt-3 font-medium">
                        <span>→</span>
                        <span>Daha Fazla</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ok butonları */}
          <div className="flex gap-2 mt-6 justify-end">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Önceki hizmet"
              className="w-11 h-11 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-[#1B3A4B] hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 2L4 7l5 5" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Sonraki hizmet"
              className="w-11 h-11 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-[#1B3A4B] hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 2l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
