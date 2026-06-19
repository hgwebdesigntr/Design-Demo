import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import styles from './AboutIntroSection.module.css';

export interface AboutIntroData {
  tag?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  features?: { label: string }[];
  image?: { asset: { url: string } };
  buttonText?: string;
  buttonHref?: string;
}

const fallbackFeatures = [
  { label: 'Konsept Tasarım' },
  { label: '3D Görselleştirme' },
  { label: 'Proje Yönetimi' },
  { label: 'Malzeme Seçimi' },
];

export default function AboutIntroSection({ data }: { data: AboutIntroData | null }) {
  const tag           = data?.tag           ?? 'Biz Kimiz';
  const heading       = data?.heading       ?? 'Tasarımla';
  const headingAccent = data?.headingAccent ?? 'Hayat Kurarız.';
  const description   = data?.description   ?? 'Armel Design olarak her projeyi bir hikaye olarak görür, her mekânı yaşayanın kimliğini yansıtacak şekilde tasarlarız.\n\nYılların deneyimi ve tutkuyla yaklaşımımızı sürekli geliştiriyoruz.';
  const features    = data?.features?.length ? data.features : fallbackFeatures;
  const imageUrl    = data?.image?.asset?.url;
  const buttonText  = data?.buttonText  ?? 'Projelerimize Bakın';
  const buttonHref  = data?.buttonHref  ?? '/projeler';

  const paragraphs = description.split('\n').filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Sol: içerik */}
        <div className={styles.content}>
          <div className={styles.tagPill}>
            <span className={styles.tagX}>×</span>
            <span className={styles.tagText}>{tag}</span>
          </div>

          <h2 className={styles.heading}>
            {heading}{heading && headingAccent ? ' ' : ''}
            {headingAccent && <span className={styles.headingAccent}>{headingAccent}</span>}
          </h2>

          <div className={styles.description}>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {features.length > 0 && (
            <ul className={styles.featureList}>
              {features.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.bullet} />
                  {f.label}
                </li>
              ))}
            </ul>
          )}

          <Link href={buttonHref} className="btn">
            <span className="btn-icon"><ArrowRightIcon size={14} /></span>
            <span className="btn-text">{buttonText}</span>
          </Link>
        </div>

        {/* Sağ: görsel */}
        <div className={styles.imageWrap}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={heading}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
          <div className={styles.imageAccent} />
        </div>

      </div>
    </section>
  );
}
