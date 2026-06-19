import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon, CouchIcon, ArmchairIcon, ChairIcon, HouseIcon, LampIcon,
  PaletteIcon, PaintBrushIcon, PaintRollerIcon, RulerIcon, StarIcon, SparkleIcon,
  DiamondIcon, CrownIcon, MagicWandIcon, LeafIcon, PlantIcon, FlowerIcon,
  HeartIcon, ShieldIcon, TrophyIcon, MedalIcon, CertificateIcon,
  CheckCircleIcon, WrenchIcon, FireIcon, SunIcon, WindIcon, CubeIcon,
} from '@phosphor-icons/react/dist/ssr';
import styles from './AboutServicesSection.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICONS: Record<string, any> = {
  Couch: CouchIcon, Armchair: ArmchairIcon, Chair: ChairIcon,
  House: HouseIcon, Lamp: LampIcon, Palette: PaletteIcon,
  PaintBrush: PaintBrushIcon, PaintRoller: PaintRollerIcon,
  Ruler: RulerIcon, Star: StarIcon, Sparkle: SparkleIcon,
  Diamond: DiamondIcon, Crown: CrownIcon, MagicWand: MagicWandIcon,
  Leaf: LeafIcon, Plant: PlantIcon, Flower: FlowerIcon,
  Heart: HeartIcon, Shield: ShieldIcon, Trophy: TrophyIcon,
  Medal: MedalIcon, Certificate: CertificateIcon,
  CheckCircle: CheckCircleIcon, Wrench: WrenchIcon, Fire: FireIcon,
  Sun: SunIcon, Wind: WindIcon, Cube: CubeIcon,
};

export interface AboutServicesCard {
  icon?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface AboutServicesData {
  tag?: string;
  heading?: string;
  headingAccent?: string;
  bgImage?: { asset: { url: string } };
  cards?: AboutServicesCard[];
}

const fallbackCards: AboutServicesCard[] = [
  { title: 'İç Mimari Tasarım',    description: 'Yaşam alanlarınızı hayalinizdeki mekâna dönüştürüyoruz.', buttonText: 'İncele', buttonHref: '/hizmetler' },
  { title: 'Konsept Geliştirme',   description: 'Size özel tasarım konseptleri ve 3D görselleştirme sunuyoruz.', buttonText: 'İncele', buttonHref: '/hizmetler' },
  { title: 'Uygulama & Yönetim',   description: 'Projenizi baştan sona yönetir, her detayı titizlikle uygularız.', buttonText: 'İncele', buttonHref: '/hizmetler' },
];

export default function AboutServicesSection({ data }: { data: AboutServicesData | null }) {
  const tag           = data?.tag           ?? 'Hizmetlerimiz';
  const heading       = data?.heading       ?? 'Nasıl';
  const headingAccent = data?.headingAccent ?? 'Çalışıyoruz';
  const bgUrl  = data?.bgImage?.asset?.url;
  const cards  = data?.cards?.length ? data.cards : fallbackCards;

  return (
    <section className={styles.section}>
      {bgUrl && (
        <Image src={bgUrl} alt="" fill className={styles.bg} sizes="100vw" />
      )}
      <div className={styles.overlay} />

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

        <div className={styles.cards}>
          {cards.map((card, i) => {
            const IconComp = card.icon ? ICONS[card.icon] : null;
            return (
              <div key={i} className={styles.card}>
                <div className={styles.iconCircle}>
                  {IconComp
                    ? <IconComp size={22} weight="regular" />
                    : <span className={styles.iconNumber}>{i + 1}</span>
                  }
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {card.description && <p className={styles.cardDesc}>{card.description}</p>}
                {card.buttonHref && (
                  <Link href={card.buttonHref} className="btn" style={{ marginTop: 'auto' }}>
                    <span className="btn-icon"><ArrowRightIcon size={12} /></span>
                    <span className="btn-text" style={{ fontSize: '11px', padding: '7px 14px' }}>
                      {card.buttonText ?? 'İncele'}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
