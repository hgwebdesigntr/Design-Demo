'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

export interface SlideData {
  _id: string;
  heading: string;
  subheading?: string;
  tags?: string[];
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  imagePlaceholder?: string;
}

interface HeroSliderProps {
  slides: SlideData[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current || count < 2) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 900);
    },
    [animating, current, count]
  );

  const goNext = useCallback(() => goTo((current + 1) % count), [current, count, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + count) % count), [current, count, goTo]);

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext, count]);

  if (!slides || slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#1B3A4B]">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s._id}
          className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          aria-hidden={i !== current}
        >
          {s.imageUrl ? (
            <Image
              src={s.imageUrl}
              alt={s.heading}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                s.imagePlaceholder ?? 'from-[#2C3E2D] via-[#3D5A52] to-[#1B3A4B]'
              }`}
            />
          )}
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/25 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-10 min-h-screen flex flex-col justify-end pb-20 pt-36">
        <div className="max-w-3xl">
          {/* Tags */}
          {slide.tags && slide.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {slide.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/40 text-xs">×</span>}
                  <span className="text-white/75 text-sm tracking-[0.15em]">{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-white font-bold leading-[1.0] mb-8 uppercase tracking-tight">
            {slide.heading}
          </h1>

          {/* Subheading */}
          {slide.subheading && (
            <p className="text-white/65 text-lg mb-8 max-w-lg leading-relaxed">{slide.subheading}</p>
          )}

          {/* CTA */}
          {slide.buttonText && (
            <Link
              href={slide.buttonHref ?? '/hizmetler'}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/25 text-[10px] tracking-[0.3em] uppercase px-7 py-4 rounded-2xl hover:bg-white hover:text-[#1B3A4B] transition-all duration-300 group"
            >
              <span className="w-7 h-7 rounded-xl bg-white/15 group-hover:bg-[#1B3A4B] flex items-center justify-center transition-colors flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
              {slide.buttonText}
            </Link>
          )}
        </div>
      </div>

      {/* Slide counter — bottom left */}
      <div className="absolute bottom-24 left-6 lg:left-10 z-30 text-white/35 text-xs tracking-[0.3em] font-light select-none">
        {String(current + 1).padStart(2, '0')}{' '}
        <span className="text-white/20">/{' '}</span>
        {String(count).padStart(2, '0')}
      </div>

      {/* Dots — bottom center */}
      {count > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slayt ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === current ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom curve — hero bölümüne dahil, fotoğraf ve overlay arkada devam eder */}
      <div className={styles.bottomCurve}>
        <svg
          viewBox="0 0 1440 88"
          preserveAspectRatio="none"
          className="w-full block h-20 lg:h-24"
        >
          <path
            d="M0 0 C360 88 1080 88 1440 0 L1440 88 L0 88 Z"
            fill="#F5F0E8"
          />
        </svg>
      </div>

      {/* Up/Down arrows — right side */}
      {count > 1 && (
        <div className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <button
            onClick={goPrev}
            aria-label="Önceki slayt"
            className="w-11 h-11 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-[#1B3A4B] hover:border-white transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 12V2M3 6l4-4 4 4" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Sonraki slayt"
            className="w-11 h-11 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-[#1B3A4B] hover:border-white transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 2v10M3 8l4 4 4-4" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
