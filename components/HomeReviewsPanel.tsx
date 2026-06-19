'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import styles from './HomeReviewsPanel.module.css';

interface Props {
  placeId?: string;
  reviewsUrl?: string;
  awardText?: string;
  bgImageUrl?: string;
}

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C23.36 18.09 22.56 15.4 22.56 12.25z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="32" height="56" viewBox="0 0 32 56" fill="none" style={flip ? { transform: 'scaleX(-1)' } as CSSProperties : undefined}>
      <line x1="16" y1="3" x2="16" y2="53" stroke="white" strokeWidth="1.4" strokeOpacity="0.6" />
      <path d="M16 9  Q6  6  3  12 Q10 12 16 9"  fill="white" fillOpacity="0.6" />
      <path d="M16 17 Q5  13  2  20 Q9  19 16 17" fill="white" fillOpacity="0.6" />
      <path d="M16 25 Q4  21  1  28 Q8  27 16 25" fill="white" fillOpacity="0.6" />
      <path d="M16 33 Q5  29  2  36 Q9  35 16 33" fill="white" fillOpacity="0.6" />
      <path d="M16 41 Q6  37  3  44 Q10 43 16 41" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

function StarBadge() {
  return (
    <div className={styles.starBadge}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="23" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <path
          d="M24 10 L27.4 19.1 L37.3 19.8 L30.1 26.2 L32.5 36 L24 30.8 L15.5 36 L17.9 26.2 L10.7 19.8 L20.6 19.1 Z"
          fill="white"
          fillOpacity="0.88"
        />
      </svg>
    </div>
  );
}

function ReviewerAvatar({ photo, fallback }: { photo?: string; fallback: string }) {
  if (photo) {
    return (
      <div className={styles.avatar}>
        <Image src={photo} alt="Yorum" fill className="object-cover" sizes="48px" />
      </div>
    );
  }
  return (
    <div className={styles.avatarFallback} style={{ background: fallback }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

function ratingToLabel(r: number) {
  if (r >= 4.5) return 'Mükemmel';
  if (r >= 4.0) return 'Çok İyi';
  if (r >= 3.5) return 'İyi';
  return 'Ortalama';
}

function fmtTotal(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

export default function HomeReviewsPanel({ placeId, reviewsUrl, awardText, bgImageUrl }: Props) {
  const [rating, setRating] = useState(4.5);
  const [total, setTotal] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!placeId) { setReady(true); return; }
    fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`)
      .then(r => r.json())
      .then(d => {
        if (d.rating != null) setRating(d.rating);
        if (d.total != null) setTotal(d.total);
        if (Array.isArray(d.reviewerPhotos)) setPhotos(d.reviewerPhotos);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [placeId]);

  return (
    <a
      href={reviewsUrl || '#'}
      target={reviewsUrl ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={styles.wrapper}
    >
      {/* Koyu arka plan bölümü */}
      <div className={styles.darkSection}>
        {bgImageUrl ? (
          <>
            <Image src={bgImageUrl} alt="Arka plan" fill className="object-cover" sizes="300px" />
            <div className={styles.overlay} />
          </>
        ) : (
          <div className={styles.gradientBg} />
        )}

        {/* Defne + ödül metni */}
        <div className={styles.laurelRow}>
          <Laurel />
          <p className={styles.awardText}>
            {awardText || "Güvenilir Tasarım Firması '25"}
          </p>
          <Laurel flip />
        </div>

        {/* Yıldız rozet */}
        <StarBadge />

        {/* Reviewer avatarları + puan */}
        <div className={styles.reviewersRow}>
          <ReviewerAvatar photo={photos[0]} fallback="linear-gradient(135deg,#f6d365,#fd9a3c)" />
          <div className={styles.ratingCircle}>
            <span className={styles.ratingValue}>
              {ready ? rating.toFixed(1) : '—'}
            </span>
          </div>
          <ReviewerAvatar photo={photos[1]} fallback="linear-gradient(135deg,#a8b8c8,#6a7a8a)" />
        </div>
      </div>

      {/* Beyaz alt çubuk */}
      <div className={styles.bottomBar}>
        <div className={styles.ratingLabel}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingText}>
            {ready ? ratingToLabel(rating) : '...'}
          </span>
        </div>
        <span className={styles.reviewCount}>
          {total != null ? `${fmtTotal(total)} Kullanıcı` : '— Kullanıcı'}
        </span>
        <GoogleG />
      </div>
    </a>
  );
}
