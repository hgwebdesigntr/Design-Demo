import Image from 'next/image';
import styles from './AboutHeroSection.module.css';

export interface AboutHeroData {
  tag?: string;
  heading?: string;
  headingAccent?: string;
  subheading?: string;
  image?: { asset: { url: string } };
}

export default function AboutHeroSection({ data }: { data: AboutHeroData | null }) {
  const tag           = data?.tag           ?? 'Hakkımızda';
  const heading       = data?.heading       ?? 'Tasarımda Tutkumuz,';
  const headingAccent = data?.headingAccent ?? 'İşimizde Kalitemiz.';
  const subheading    = data?.subheading    ?? '';
  const imageUrl      = data?.image?.asset?.url;

  return (
    <section className={styles.hero}>
      {imageUrl && (
        <Image src={imageUrl} alt="" fill className={styles.bg} sizes="100vw" priority />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.tag}>{tag}</span>
        <h1 className={styles.heading}>
          {heading}{heading && headingAccent ? ' ' : ''}
          {headingAccent && <span className={styles.headingAccent}>{headingAccent}</span>}
        </h1>
        {subheading && <p className={styles.subheading}>{subheading}</p>}
      </div>
    </section>
  );
}
