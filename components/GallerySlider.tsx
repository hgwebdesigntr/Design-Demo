'use client';
import { useState } from 'react';
import Image from 'next/image';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

interface Props {
  images: { asset: { url: string } }[];
}

export default function GallerySlider({ images }: Props) {
  const [idx, setIdx] = useState(0);

  const valid = images.filter(img => img?.asset?.url);
  if (!valid.length) return null;

  const prev = () => setIdx(i => (i - 1 + valid.length) % valid.length);
  const next = () => setIdx(i => (i + 1) % valid.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#1B3A4B]" style={{ aspectRatio: '16/9' }}>
      <Image
        src={valid[idx].asset.url}
        alt=""
        fill
        className="object-cover"
        priority={idx === 0}
      />

      {valid.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Önceki görsel"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1B3A4B] hover:bg-[#1B3A4B] hover:text-white transition-colors z-10"
          >
            <CaretLeftIcon size={18} weight="bold" />
          </button>
          <button
            onClick={next}
            aria-label="Sonraki görsel"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1B3A4B] hover:bg-[#1B3A4B] hover:text-white transition-colors z-10"
          >
            <CaretRightIcon size={18} weight="bold" />
          </button>

          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-10 tabular-nums">
            {idx + 1} / {valid.length}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {valid.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Görsel ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/45'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
