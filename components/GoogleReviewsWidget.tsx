'use client';

import { useEffect, useState } from 'react';

interface Props {
  placeId?: string;
  reviewsUrl?: string;
  awardText?: string;
  variant?: 'card' | 'panel';
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#FBBF24' : 'none'} stroke={filled ? '#FBBF24' : '#D1D5DB'} strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

function getRatingLabel(r: number): string {
  if (r >= 4.5) return 'Mükemmel';
  if (r >= 4.0) return 'Çok İyi';
  if (r >= 3.5) return 'İyi';
  return 'Ortalama';
}

const avatarColors = [
  'from-amber-300 to-orange-400',
  'from-blue-300 to-blue-500',
  'from-emerald-300 to-teal-500',
];

function Avatar({ colorClass }: { colorClass: string }) {
  return (
    <div className={`w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    </div>
  );
}

export default function GoogleReviewsWidget({ placeId, reviewsUrl, awardText, variant = 'card' }: Props) {
  const [data, setData] = useState<{ rating: number | null; total: number | null }>({ rating: null, total: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeId) { setLoading(false); return; }
    fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [placeId]);

  const rating = data.rating ?? 4.5;
  const total = data.total ?? null;
  const hasRealData = data.rating !== null;
  const filledStars = Math.round(rating);

  if (variant === 'panel') {
    return (
      <a
        href={reviewsUrl || '#'}
        target={reviewsUrl ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="flex flex-col h-full w-full rounded-3xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300 group"
      >
        {/* Dark header */}
        <div className="bg-[#1B3A4B] px-6 py-5 flex items-center gap-3 flex-shrink-0">
          <AwardIcon />
          <span className="text-white text-sm font-medium leading-snug">
            {awardText || "Trusted Interior Design Firm'25"}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col justify-between px-6 py-6">
          {/* Rating big */}
          <div>
            <div className="flex items-end gap-4 mb-4">
              <div className="font-bold text-[64px] text-[#1B3A4B] leading-none">
                {loading ? '–' : rating.toFixed(1)}
              </div>
              <div className="mb-2 text-sm text-gray-400">/ 5.0</div>
            </div>
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={!loading && i <= filledStars} />
              ))}
            </div>
            <div className="text-base font-semibold text-[#2C2C2C] mb-1">
              {loading ? '...' : getRatingLabel(rating)}
            </div>
            {total !== null && (
              <div className="text-sm text-gray-400">{formatCount(total)} Google yorumu</div>
            )}
            {!hasRealData && !loading && (
              <div className="text-xs text-gray-300 mt-0.5">Örnek veri</div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-5" />

          {/* Avatars + Google */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {avatarColors.map((c, i) => <Avatar key={i} colorClass={c} />)}
              <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] text-gray-400 font-medium flex-shrink-0">
                +{total ? formatCount(total) : '99'}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 group-hover:bg-gray-100 transition-colors">
              <GoogleIcon size={16} />
              <span className="text-xs text-gray-500 font-medium">Google</span>
            </div>
          </div>

          {/* Yoruma git */}
          {reviewsUrl && (
            <div className="mt-5 text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C4622D] border border-[#C4622D]/30 rounded-full px-4 py-2 group-hover:bg-[#C4622D] group-hover:text-white transition-colors">
                Yorumları Gör
              </span>
            </div>
          )}
        </div>
      </a>
    );
  }

  /* ── default: card variant ── */
  return (
    <a
      href={reviewsUrl || '#'}
      target={reviewsUrl ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="block w-72 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="bg-[#1B3A4B] px-5 py-3 flex items-center gap-3">
        <AwardIcon />
        <span className="text-white text-xs font-medium tracking-wide leading-tight">
          {awardText || "Trusted Interior Design Firm'25"}
        </span>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex -space-x-2">
            {avatarColors.map((c, i) => <Avatar key={i} colorClass={c} />)}
          </div>
          <div className="text-right">
            <div className="font-bold text-3xl text-[#1B3A4B] leading-none">
              {loading ? '–' : rating.toFixed(1)}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">/ 5.0</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={!loading && i <= filledStars} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#2C2C2C]">
                {loading ? '...' : getRatingLabel(rating)}
              </span>
              {total !== null && <span className="text-xs text-gray-400">{formatCount(total)} Yorum</span>}
              {!hasRealData && !loading && <span className="text-xs text-gray-300">örnek veri</span>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2">
            <GoogleIcon size={18} />
            <span className="text-xs text-gray-500 font-medium">Google</span>
          </div>
        </div>
      </div>
    </a>
  );
}
