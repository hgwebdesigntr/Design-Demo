import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import HeroSlider, { SlideData } from '@/components/HeroSlider';
import HomeReviewsPanel from '@/components/HomeReviewsPanel';
import ServicesSlider, { ServiceData } from '@/components/ServicesSlider';
import StatsSection from '@/components/StatsSection';
import ProjectsSlider from '@/components/ProjectsSlider';
import StyleFinderSection from '@/components/StyleFinderSection';
import { getHeroSlides, getFeaturedProjects, getServices, getAboutContent, getHomeServicesSection, getHomeStatsSection, getHomeStyleFinderSection } from '@/sanity/lib/queries';
import styles from './page.module.css';

/* ── Sarkık lamba ikonu ── */
function PendantLampIcon() {
  const S = '#888888';
  return (
    <svg width="86" height="66" viewBox="0 0 86 66" fill="none" stroke={S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="7" x2="78" y2="7" strokeWidth="2" />
      <line x1="23" y1="7" x2="23" y2="24" />
      <path d="M14 24 Q14 18 23 18 Q32 18 32 24 L29 35 L17 35 Z" />
      <circle cx="23" cy="37" r="2.2" fill={S} stroke="none" />
      <line x1="23" y1="39.5" x2="23" y2="44" />
      <line x1="23" y1="39.5" x2="18.5" y2="44" />
      <line x1="23" y1="39.5" x2="27.5" y2="44" />
      <line x1="43" y1="7" x2="43" y2="17" />
      <path d="M34 17 Q34 11 43 11 Q52 11 52 17 L49 28 L37 28 Z" />
      <circle cx="43" cy="30" r="2.2" fill={S} stroke="none" />
      <line x1="43" y1="32.5" x2="43" y2="37" />
      <line x1="43" y1="32.5" x2="38.5" y2="37" />
      <line x1="43" y1="32.5" x2="47.5" y2="37" />
      <line x1="63" y1="7" x2="63" y2="33" />
      <path d="M54 33 Q54 27 63 27 Q72 27 72 33 L69 44 L57 44 Z" />
      <circle cx="63" cy="46" r="2.2" fill={S} stroke="none" />
      <line x1="63" y1="48.5" x2="63" y2="53" />
      <line x1="63" y1="48.5" x2="58.5" y2="53" />
      <line x1="63" y1="48.5" x2="67.5" y2="53" />
    </svg>
  );
}

/* ── Wave dividers — renk dinamik olduğu için CSS variable kullanılıyor ── */
function WaveDown({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div className={styles.wave} style={{ '--wave-bg': topColor } as CSSProperties}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full block h-16">
        <path d="M0 0 C480 70 960 70 1440 0 L1440 70 L0 70 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}
function WaveUp({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div className={styles.wave} style={{ '--wave-bg': topColor } as CSSProperties}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full block h-16">
        <path d="M0 70 C480 0 960 0 1440 70 L1440 0 L0 0 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}

/* ── Fallback data ── */
const fallbackSlides: SlideData[] = [
  { _id: '1', heading: 'Luxury Living Interiors', tags: ['Modern', 'Klasik', 'Zarif'], buttonText: 'Hizmetleri Keşfet', buttonHref: '/hizmetler', imagePlaceholder: 'from-[#2C3E2D] via-[#4A6858] to-[#1B3A4B]' },
  { _id: '2', heading: 'Hayaller Mekâna Dönüşür', tags: ['Tasarım', 'Mimarlık', 'Yaşam'], buttonText: 'Projelerimiz', buttonHref: '/projeler', imagePlaceholder: 'from-[#3D2C1E] via-[#8B6040] to-[#4A2C1A]' },
  { _id: '3', heading: 'Her Mekân Bir Hikâye', tags: ['Premium', 'Özel Tasarım'], buttonText: 'İletişime Geç', buttonHref: '/iletisim', imagePlaceholder: 'from-[#1B3A4B] via-[#2C5060] to-[#0D2030]' },
];

const fallbackServices = [
  { _id: '1', icon: 'interior', categoryLabel: 'İÇ MİMARİ', title: 'İç Mimari Tasarım', description: 'Hayalinizdeki mekanları fonksiyonel ve estetik çözümlerle tasarlıyoruz.' },
  { _id: '2', icon: 'concept', categoryLabel: 'KONSEPT', title: 'Konsept Geliştirme', description: 'İhtiyaçlarınıza özel konsept ve malzeme seçimlerini titizlikle belirliyoruz.' },
  { _id: '3', icon: 'application', categoryLabel: 'UYGULAMA', title: 'Uygulama & Koordinasyon', description: 'Yaşam alanlarınızı baştan sona profesyonelce hayata geçiriyoruz.' },
  { _id: '4', icon: 'renovation', categoryLabel: 'YENİLEME', title: 'Tadilat & Yenileme', description: 'Mevcut mekanlarınızı modern bir anlayışla yeniden yorumluyoruz.' },
];

const fallbackProjects = [
  { _id: '1', title: 'Modern Konut', slug: 'modern-konut', location: 'İstanbul', category: 'Konut', coverImage: null, gradient: 'from-[#C9AA7C] to-[#7A5C42]' },
  { _id: '2', title: 'Özel Villa', slug: 'ozel-villa', location: 'Bodrum', category: 'Villa', coverImage: null, gradient: 'from-[#8FA89B] to-[#3D5A52]' },
  { _id: '3', title: 'Lüks Rezidans', slug: 'luks-rezidans', location: 'İzmir', category: 'Rezidans', coverImage: null, gradient: 'from-[#C4B09A] to-[#7A5C42]' },
];

const gradients = ['from-[#C9AA7C] to-[#7A5C42]', 'from-[#8FA89B] to-[#3D5A52]', 'from-[#C4B09A] to-[#7A5C42]'];

const fallbackAbout = {
  active: true as boolean,
  tag: 'Hakkımızda',
  heading: 'Yenilikçi Mekanlar, İlham Veren Yaşamlar',
  missionTitle: 'Misyon & Amaç',
  description: 'Güzel, sürdürülebilir ve kişiye özel mekanlar tasarlamaya adanmış bir iç mimarlık firmasıyız.',
  missionPoints: ['Kişiselleştirilmiş tasarımlar', 'Estetik ile fonksiyon', 'İnovasyon odaklı yaklaşım', 'Kaliteden taviz vermemek'],
  buttonText: 'Hakkımızda',
  buttonHref: '/hakkimizda',
  yearsOfExperience: 10,
  projectCount: 50,
  cityCount: 5,
  mainImage: null as null | { asset: { url: string } },
  reviewsBgImage: null as null | { asset: { url: string } },
  awardText: "Güvenilir Tasarım Firması '25",
  googlePlaceId: null as string | null,
  googleReviewsUrl: null as string | null,
};

const steps = [
  { num: '01', title: 'Keşif', desc: 'İhtiyaçlarınızı dinleyip analiz ediyoruz.' },
  { num: '02', title: 'Tasarım', desc: 'Özgün ve işlevsel konseptler üretiyoruz.' },
  { num: '03', title: 'Planlama', desc: 'Her detayı önceden planlıyoruz.' },
  { num: '04', title: 'Uygulama', desc: 'Titizlikle hayata geçiriyoruz.' },
  { num: '05', title: 'Teslim', desc: 'Eksiksiz ve zamanında teslim ediyoruz.' },
];

export default async function Home() {
  let sanitySlides: SlideData[] = [];
  let sanityServices: ServiceData[] = [];
  let servicesSection   = null;
  let statsSection      = null;
  let styleFinderSection = null;
  let projects: typeof fallbackProjects = [];
  let about = fallbackAbout;

  try {
    const [rawSlides, rawServices, rawSection, rawStatsSection, rawStyleFinder, rawProjects, rawAbout] = await Promise.all([
      getHeroSlides(),
      getServices(),
      getHomeServicesSection(),
      getHomeStatsSection(),
      getHomeStyleFinderSection(),
      getFeaturedProjects(),
      getAboutContent(),
    ]);

    if (rawAbout) about = { ...fallbackAbout, ...rawAbout };

    sanitySlides = (rawSlides || []).map((s: Record<string, unknown>) => ({
      _id: String(s._id ?? ''),
      heading: String(s.heading ?? ''),
      subheading: s.subheading ? String(s.subheading) : undefined,
      tags: Array.isArray(s.tags) ? s.tags.map(String) : [],
      buttonText: String(s.buttonText ?? 'Keşfet'),
      buttonHref: String(s.buttonHref ?? '/hizmetler'),
      imageUrl: (s.image as { asset?: { url?: string } })?.asset?.url ?? undefined,
    }));

    sanityServices = (rawServices || []) as ServiceData[];
    servicesSection    = rawSection       ?? null;
    statsSection       = rawStatsSection  ?? null;
    styleFinderSection = rawStyleFinder   ?? null;

    projects = (rawProjects || []).map((p: Record<string, unknown>, i: number) => ({
      ...p,
      gradient: gradients[i % gradients.length],
    })) as typeof fallbackProjects;
  } catch (err) {
    console.error('[Sanity] Veri çekme hatası:', err);
  }

  const slides = sanitySlides.length > 0 ? sanitySlides : fallbackSlides;
  const displayServices: ServiceData[] = sanityServices.length > 0
    ? sanityServices
    : fallbackServices.map(s => ({ ...s, slug: s._id }));
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <>
      {/* ═══ HERO SLIDER ═══ */}
      <HeroSlider slides={slides} />

      {/* ═══ HAKKIMIZDA ═══ */}
      {about.active !== false && <section className="bg-[#F5F0E8] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* ══ SOL: stat kartı + dikey yazı kartı ══ */}
            <div className="lg:col-span-4 flex gap-3 items-stretch">

              {/* Ana beyaz kart */}
              <div className={`flex-1 rounded-3xl border overflow-hidden ${styles.aboutCard}`}>

                {/* Üst: lamba + metin */}
                <div className={styles.cardTop}>
                  <PendantLampIcon />
                  <p className={styles.cardLabel}>
                    Yıllık İç Mimarlık &<br />Mimari Mükemmellik
                  </p>
                </div>

                <div className={styles.cardDivider} />

                {/* Alt: ghost sayı + çember fotoğraf */}
                <div className={styles.cardBottom}>
                  <span className={styles.ghostNumber}>
                    {about.yearsOfExperience}
                  </span>
                  <div className={styles.circlePhoto}>
                    {about.mainImage?.asset?.url && (
                      <Image
                        src={about.mainImage.asset.url}
                        alt="İç mekan tasarım fotoğrafı"
                        fill
                        className="object-cover object-top"
                        sizes="340px"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Dikey yazı kartı */}
              <div className={`bg-white rounded-[18px] border border-gray-200 flex items-center justify-center shrink-0 ${styles.sidebarCard}`}>
                <span className={styles.sidebarText}>
                  {about.cityCount} Şehirde Proje
                </span>
              </div>
            </div>

            {/* ══ ORTA: içerik ══ */}
            <div className={`lg:col-span-5 ${styles.middleContent}`}>

              <div className={styles.tagPill}>
                <span className={styles.tagX}>×</span>
                <span className={styles.tagText}>{about.tag}</span>
              </div>

              <h2 className={styles.sectionHeading}>{about.heading}</h2>

              <p className={styles.missionTitle}>{about.missionTitle}</p>

              {about.description && (
                <p className={styles.description}>{about.description}</p>
              )}

              {about.missionPoints && (about.missionPoints as string[]).length > 0 && (
                <ul className={styles.missionList}>
                  {(about.missionPoints as string[]).map((point) => (
                    <li key={point} className={styles.missionItem}>
                      <span className={styles.missionArrow}>→→</span>
                      <span className={styles.missionText}>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div>
                <Link href={about.buttonHref || '/hakkimizda'} className="btn">
                  <span className="btn-icon"><ArrowRight size={16} /></span>
                  <span className="btn-text">{about.buttonText}</span>
                </Link>
              </div>
            </div>

            {/* ══ SAĞ: Google Reviews ══ */}
            <div className="lg:col-span-3">
              <HomeReviewsPanel
                placeId={about.googlePlaceId ?? undefined}
                reviewsUrl={about.googleReviewsUrl ?? undefined}
                awardText={about.awardText}
                bgImageUrl={about.reviewsBgImage?.asset?.url}
              />
            </div>

          </div>
        </div>
      </section>}

      {/* ═══ HİZMETLER ═══ */}
      {servicesSection?.active !== false && <ServicesSlider services={displayServices} section={servicesSection} />}

      {/* ═══ İSTATİSTİKLER ═══ */}
      {statsSection?.active !== false && <StatsSection data={statsSection} />}

      {/* ═══ PROJELER ═══ */}
      <ProjectsSlider projects={displayProjects} />

      {/* ═══ TASARIM STİLİ BULUCU ═══ */}
      {styleFinderSection?.active !== false && <StyleFinderSection data={styleFinderSection} />}

      {/* ═══ SÜREÇ ═══ */}
      <section className="bg-[#F5F0E8] py-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4C5A9]/25 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4C5A9]/20 translate-y-1/3 -translate-x-1/4" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#C4622D] mb-4 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-[#C4622D]" /> Çalışma Sürecimiz <span className="w-6 h-px bg-[#C4622D]" />
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#1B3A4B]">
              Adım Adım{' '}
              <span className="font-script text-[#C4622D] text-5xl lg:text-6xl">Mükemmelliğe</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative flex flex-col items-center text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[55%] w-full h-px border-t-2 border-dashed border-[#D4C5A9]" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[#C4622D] bg-[#F5F0E8] flex items-center justify-center mb-5 group-hover:bg-[#C4622D] transition-colors duration-300 shadow-sm">
                  <span className="font-script text-2xl text-[#C4622D] group-hover:text-white transition-colors duration-300 leading-none">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-serif text-[#1B3A4B] text-lg mb-1">{s.title}</h3>
                <p className="text-[#2C2C2C]/45 text-xs leading-relaxed px-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <WaveDown topColor="#F5F0E8" bottomColor="#1B3A4B" />
      <section className="bg-[#1B3A4B] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-[1.2] mb-1">Hayalinizdeki Mekanı</h2>
            <span className="font-script text-5xl lg:text-6xl text-[#C4622D] leading-[1.4] block">Birlikte Tasarlayalım.</span>
          </div>
          <Link href="/iletisim" className="btn">
            <span className="btn-icon"><ArrowRight size={16} /></span>
            <span className="btn-text">Hemen İletişime Geç</span>
          </Link>
        </div>
      </section>
    </>
  );
}
