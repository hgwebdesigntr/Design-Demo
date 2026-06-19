'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import styles from './ProjectsSlider.module.css';

export interface ProjectCardData {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  coverImage?: { asset?: { url?: string } } | null;
  gradient?: string;
}

const GAP     = 28;
const VISIBLE = 3;

export default function ProjectsSlider({ projects }: { projects: ProjectCardData[] }) {
  const router       = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [cardWidth,    setCardWidth]    = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDelta,    setDragDelta]    = useState(0);
  const [isDragging,   setIsDragging]   = useState(false);
  const [hoveredId,    setHoveredId]    = useState<string | null>(null);

  const startXRef   = useRef(0);
  const dragDistRef = useRef(0);

  const maxIndex = Math.max(0, projects.length - VISIBLE);

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

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, idx)));
    setDragDelta(0);
  }, [maxIndex]);

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

  const handleCardClick = (slug: string) => {
    if (dragDistRef.current > 8) return;
    router.push(`/projeler/${slug}`);
  };

  const translate = cardWidth > 0 ? -(currentIndex * step) + dragDelta : 0;

  return (
    <section className="bg-[#F5F0E8] py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* ── Başlık + Prev/Next ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#2C2C2C]/18 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#C4622D] text-xs font-semibold">×</span>
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#2C2C2C]/55 font-medium">
                PORTFÖYÜMÜZ
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-[#1B3A4B] leading-tight font-serif">
              Son Tasarım{' '}
              <span className={styles.headingScript}>Yaratımlarımız</span>
            </h2>
          </div>

          <div className="flex items-center gap-5 pb-1">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className={styles.navBtn}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
              Önceki
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex >= maxIndex}
              className={styles.navBtn}
            >
              Sonraki
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Slider ── */}
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
            {projects.map((p) => {
              const hovered = hoveredId === p._id;
              return (
                <div
                  key={p._id}
                  className={styles.card}
                  style={{ width: cardWidth }}
                  onMouseEnter={() => setHoveredId(p._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleCardClick(p.slug)}
                >
                  {/* Görsel */}
                  <div className={styles.imageWrapper}>
                    {p.coverImage?.asset?.url ? (
                      <Image
                        src={p.coverImage.asset.url}
                        alt={p.title}
                        fill
                        className={`${styles.cardImage} ${hovered ? styles.cardImageHovered : ''}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        draggable={false}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-linear-to-br ${p.gradient ?? 'from-[#C9AA7C] to-[#7A5C42]'}`} />
                    )}
                  </div>

                  {/* Kategori */}
                  {p.category && (
                    <div className={styles.categoryRow}>
                      <svg
                        width="13" height="13" viewBox="0 0 16 16"
                        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={styles.categoryIcon}
                      >
                        <rect x="2" y="1" width="12" height="14" rx="1.5" />
                        <line x1="5" y1="5" x2="11" y2="5" />
                        <line x1="5" y1="8" x2="11" y2="8" />
                        <line x1="5" y1="11" x2="9" y2="11" />
                      </svg>
                      <span className={styles.categoryLabel}>{p.category}</span>
                    </div>
                  )}

                  {/* Başlık + Ok */}
                  <div className={styles.titleRow}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <div className={`${styles.arrowBtn} ${hovered ? styles.arrowBtnHovered : ''}`}>
                      <svg
                        width="14" height="14" viewBox="0 0 14 14"
                        fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        className={`${styles.arrowIcon} ${hovered ? styles.arrowIconHovered : ''}`}
                      >
                        <path d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tüm Projeler linki ── */}
        <div className="text-center mt-14">
          <Link href="/projeler" className="btn">
            <span className="btn-icon"><ArrowRight size={16} /></span>
            <span className="btn-text">Tüm Projeleri Gör</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
