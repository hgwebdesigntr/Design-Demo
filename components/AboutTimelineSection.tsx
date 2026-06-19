import styles from './AboutTimelineSection.module.css';

export interface TimelineItem {
  year?: string;
  title: string;
  description?: string;
}

export interface AboutTimelineData {
  tag?: string;
  heading?: string;
  headingAccent?: string;
  items?: TimelineItem[];
}

const fallbackItems: TimelineItem[] = [
  { year: '2024', title: 'En İyi İç Mimari Stüdyosu',       description: 'Türkiye İç Mimari Ödülleri — Birinci' },
  { year: '2023', title: 'Sürdürülebilir Tasarım Ödülü',    description: 'Yeşil Bina Konseyi Onur Ödülü' },
  { year: '2022', title: 'Yılın Projesi',                   description: 'IMOB Fuarı — Lüks Konut Kategorisi' },
  { year: '2021', title: 'İnovasyon Ödülü',                 description: 'Anadolu Mimarlık Birliği' },
  { year: '2020', title: 'En İyi Ticari Mekan',             description: 'İstanbul Design Week — Finalist' },
  { year: '2018', title: 'Kuruluş',                         description: 'Armel Design İstanbul\'da kuruldu' },
];

export default function AboutTimelineSection({ data }: { data: AboutTimelineData | null }) {
  const tag           = data?.tag           ?? 'Başarılarımız';
  const heading       = data?.heading       ?? 'Ödüller &';
  const headingAccent = data?.headingAccent ?? 'Kilometre Taşları';
  const items   = data?.items?.length ? data.items : fallbackItems;

  const left  = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={styles.tagPill}>
            <span className={styles.tagX}>×</span>
            <span className={styles.tagText}>{tag}</span>
          </div>
          <h2 className={styles.heading}>
            {heading}{heading && headingAccent ? ' ' : ''}
            {headingAccent && <span className={styles.headingAccent}>{headingAccent}</span>}
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            {left.map((item, i) => (
              <TimelineCard key={i} item={item} />
            ))}
          </div>
          <div className={styles.col}>
            {right.map((item, i) => (
              <TimelineCard key={i} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div className={styles.item}>
      {item.year && <span className={styles.year}>{item.year}</span>}
      <div className={styles.itemBody}>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        {item.description && <p className={styles.itemDesc}>{item.description}</p>}
      </div>
    </div>
  );
}
