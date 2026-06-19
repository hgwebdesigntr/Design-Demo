'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import styles from './StatsSection.module.css';

interface Stat {
  label: string;
  value: number;
}

export interface StatsSectionData {
  image?: { asset: { url: string } };
  tag?: string;
  heading?: string;
  subheading?: string;
  stats?: Stat[];
  ctaPretext?: string;
  ctaText?: string;
  ctaType?: 'popup' | 'link';
  ctaLink?: string;
}

const fallbackStats: Stat[] = [
  { label: 'Bizi Tavsiye Eden Müşteriler', value: 72 },
  { label: 'Müşteri Memnuniyeti',           value: 95 },
  { label: 'Özel Lüks Projeler',            value: 25 },
];

export default function StatsSection({ data }: { data: StatsSectionData | null }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleCta = () => {
    window.dispatchEvent(new CustomEvent('armel:open-popup'));
  };

  const tag        = data?.tag        ?? 'PERFORMANSIMIZ';
  const heading    = data?.heading    ?? 'Rakamlarla Armel Design';
  const subheading = data?.subheading ?? 'Kalitemizi, müşteri memnuniyetimizi ve lüks proje deneyimimizi yansıtan temel rakamlar.';
  const stats      = (data?.stats && data.stats.length > 0) ? data.stats : fallbackStats;
  const ctaPretext = data?.ctaPretext ?? 'Etkilendiniz mi? Hemen harekete geçin.';
  const ctaText    = data?.ctaText    ?? 'Hemen Başlayalım';
  const ctaType    = data?.ctaType    ?? 'popup';
  const ctaLink    = data?.ctaLink;
  const imageUrl   = data?.image?.asset?.url;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.row}>

        {/* ── Sol: görsel ── */}
        <div className={styles.imageCol}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-[#C9AA7C] to-[#7A5C42]" />
          )}
        </div>

        {/* ── Sağ: içerik ── */}
        <div className={styles.contentCol}>

          <div className={styles.tagPill}>
            <span className={styles.tagX}>×</span>
            <span className={styles.tagText}>{tag}</span>
          </div>

          <h2 className={styles.heading}>{heading}</h2>

          <p className={styles.subheading}>{subheading}</p>

          <div className={styles.statsWrapper}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}%</span>
                </div>
                <div className={styles.statTrack}>
                  <div
                    className={styles.statBar}
                    style={{
                      width: animated ? `${stat.value}%` : '0%',
                      transitionDuration: `${900 + i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className={styles.ctaPretext}>{ctaPretext}</p>
            <div className="mt-3">
              {ctaType === 'link' && ctaLink ? (
                <Link href={ctaLink} className="btn">
                  <span className="btn-icon"><ArrowRight size={16} /></span>
                  <span className="btn-text">{ctaText}</span>
                </Link>
              ) : (
                <button onClick={handleCta} className="btn">
                  <span className="btn-icon"><ArrowRight size={16} /></span>
                  <span className="btn-text">{ctaText}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
