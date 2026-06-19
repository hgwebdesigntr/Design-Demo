'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowRightIcon, CornersOutIcon, GridFourIcon, GearIcon,
  CouchIcon, ArmchairIcon, ChairIcon, HouseIcon, LampIcon, PaletteIcon,
  PaintBrushIcon, PaintRollerIcon, RulerIcon, StarIcon, SparkleIcon,
  DiamondIcon, CrownIcon, MagicWandIcon, LeafIcon, PlantIcon, FlowerIcon,
  FeatherIcon, HeartIcon, ShieldIcon, TrophyIcon, MedalIcon, CertificateIcon,
  CheckCircleIcon, WrenchIcon, FireIcon, SunIcon, WindIcon, CubeIcon,
} from '@phosphor-icons/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import type { PanoMode, PanoControl } from './PanoramaViewer';
import styles from './StyleFinderSection.module.css';

const FEATURE_ICONS: Record<string, PhosphorIcon> = {
  Couch: CouchIcon, Armchair: ArmchairIcon, Chair: ChairIcon,
  House: HouseIcon, Lamp: LampIcon, Palette: PaletteIcon,
  PaintBrush: PaintBrushIcon, PaintRoller: PaintRollerIcon,
  Ruler: RulerIcon, Star: StarIcon, Sparkle: SparkleIcon,
  Diamond: DiamondIcon, Crown: CrownIcon, MagicWand: MagicWandIcon,
  Leaf: LeafIcon, Plant: PlantIcon, Flower: FlowerIcon,
  Feather: FeatherIcon, Heart: HeartIcon, Shield: ShieldIcon,
  Trophy: TrophyIcon, Medal: MedalIcon, Certificate: CertificateIcon,
  CheckCircle: CheckCircleIcon, Wrench: WrenchIcon, Fire: FireIcon,
  Sun: SunIcon, Wind: WindIcon, Cube: CubeIcon,
};

const PanoramaViewer = dynamic(() => import('./PanoramaViewer'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#1B3A4B' }} />,
});

/* ── Tipler ── */
export interface StyleFinderTab {
  title: string;
  mediaType: 'panorama' | 'video' | 'image';
  panoramaImage?: { asset: { url: string } };
  panoramaUrl?: string;
  videoSource?: 'youtube' | 'selfhosted';
  videoUrl?: string;
  image?: { asset: { url: string } };
}

export interface StyleFinderData {
  decorativeImage?: { asset: { url: string } };
  tag?: string;
  heading?: string;
  subheading?: string;
  cardDescription?: string;
  features?: { label: string; icon?: string }[];
  ctaText?: string;
  ctaLink?: string;
  tabs?: StyleFinderTab[];
}

/* ── YouTube ID çıkarıcı ── */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/* ── Fallback verileri ── */
const fallbackTabs: StyleFinderTab[] = [
  { title: 'Modern',      mediaType: 'image' },
  { title: 'Minimalist',  mediaType: 'image' },
  { title: 'Endüstriyel', mediaType: 'image' },
];

const fallbackFeatures: { label: string; icon?: string }[] = [
  { label: 'Sade Çizgiler'   },
  { label: 'İşlevsel Alanlar' },
  { label: 'Kaliteli Malzeme' },
];

export default function StyleFinderSection({ data }: { data: StyleFinderData | null }) {
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [showPanel,      setShowPanel]      = useState(true);
  const [showSettings,   setShowSettings]   = useState(false);
  const [panoMode,       setPanoMode]       = useState<PanoMode>('normal');
  const [panoControl,    setPanoControl]    = useState<PanoControl>('mouse');
  const [fullscreenTick, setFullscreenTick] = useState(0);

  const tag         = data?.tag         ?? 'Tasarım Tarzını Bul';
  const heading     = data?.heading     ?? 'Kendi Tarzını Keşfet';
  const subheading  = data?.subheading  ?? 'Yaşam alanınızı yansıtacak tasarım stilini birlikte bulalım.';
  const cardDesc    = data?.cardDescription ?? 'Her mekân bir hikâye anlatır. Sizin hikâyenizi en iyi ifade eden tarzı seçin ve hayal ettiğiniz yaşam alanına kavuşun.';
  const features    = data?.features?.length ? data.features : fallbackFeatures;
  const ctaText     = data?.ctaText     ?? 'Daha Fazlası';
  const ctaLink     = data?.ctaLink     ?? '/hizmetler';
  const tabs        = data?.tabs?.length  ? data.tabs : fallbackTabs;
  const decoUrl     = data?.decorativeImage?.asset?.url;

  const totalTabs  = tabs.length;
  const activeTab  = tabs[activeIndex] ?? tabs[0];
  const isPanorama = activeTab?.mediaType === 'panorama';

  const handleFullscreen = useCallback(() => {
    setFullscreenTick((t) => t + 1);
  }, []);

  const handleModeSelect = (m: PanoMode) => {
    setPanoMode(m);
    if (m !== 'normal') setPanoControl('sensor');
  };

  /* ── Medya render ── */
  function renderMedia() {
    if (!activeTab) return null;

    if (activeTab.mediaType === 'panorama') {
      const url = activeTab.panoramaImage?.asset?.url ?? activeTab.panoramaUrl;
      if (url) {
        return (
          <PanoramaViewer
            panoramaUrl={url}
            mode={panoMode}
            control={panoControl}
            fullscreenTrigger={fullscreenTick}
          />
        );
      }
    }

    if (activeTab.mediaType === 'video' && activeTab.videoUrl) {
      if (activeTab.videoSource === 'youtube') {
        const vid = extractYouTubeId(activeTab.videoUrl);
        if (vid) {
          return (
            <iframe
              className={styles.videoFrame}
              src={`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&mute=1&loop=1&playlist=${vid}&controls=0&playsinline=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          );
        }
      }
      return (
        <video
          className={styles.videoEl}
          src={activeTab.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    if (activeTab.mediaType === 'image' && activeTab.image?.asset?.url) {
      return (
        <Image
          src={activeTab.image.asset.url}
          alt={activeTab.title ?? ''}
          fill
          className={styles.mediaImage}
          sizes="100vw"
        />
      );
    }

    /* Fallback: koyu gradient */
    return <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1B3A4B 0%, #2C5060 100%)' }} />;
  }

  return (
    <section className={styles.section}>
      {/* ── Pentagon arka plan ── */}
      <div className={styles.pentagon} />

      {/* ── Dekoratif görsel (tam genişlik arka plan) ── */}
      <div className={styles.decorativeWrapper}>
        {decoUrl && <img src={decoUrl} alt="" className={styles.decorativeImage} />}
      </div>

      {/* ── Başlık alanı ── */}
      <div className={styles.headingArea}>
        <div className={styles.tagPill}>
          <span className={styles.tagX}>×</span>
          <span className={styles.tagText}>{tag}</span>
        </div>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      {/* ── Ana kart ── */}
      <div className={styles.card}>

        {/* Medya alanı */}
        <div className={styles.mediaArea}>
          {renderMedia()}
        </div>

        {/* Beyaz overlay panel */}
        <div className={`${styles.panel} ${showPanel ? '' : styles.panelHidden}`}>

          {/* Sayaç */}
          <div className={styles.counter}>
            <span className={styles.counterNum}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className={styles.counterLine} />
            <span className={`${styles.counterNum} ${styles.counterNumDim}`}>
              {String(totalTabs).padStart(2, '0')}
            </span>
          </div>

          {/* Tab navigasyon */}
          <div className={styles.tabNav}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`${styles.tabBtn} ${i === activeIndex ? styles.tabBtnActive : ''}`}
                onClick={() => { setActiveIndex(i); setShowSettings(false); }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Açıklama (statik) */}
          <p className={styles.cardDesc}>{cardDesc}</p>

          {/* Özellikler (statik) */}
          <div className={styles.features}>
            {features.map((f, i) => {
              const IconComp = f.icon ? FEATURE_ICONS[f.icon] : null;
              return (
                <div key={i} className={styles.feature}>
                  <span className={styles.featureIcon}>
                    {IconComp ? <IconComp size={18} weight="regular" /> : '×'}
                  </span>
                  <span className={styles.featureLabel}>{f.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTA butonu */}
          <div className={styles.ctaWrap}>
            <Link href={ctaLink} className="btn">
              <span className="btn-icon"><ArrowRightIcon size={14} /></span>
              <span className="btn-text" style={{ fontSize: '12px', padding: '8px 16px' }}>{ctaText}</span>
            </Link>
          </div>
        </div>

        {/* ── Kontrol ikonları ── */}
        <div className={styles.controls}>

          {/* Panel aç/kapat (# / grid ikonu) */}
          <button
            className={`${styles.ctrlBtn} ${styles.btnToggle}`}
            onClick={() => setShowPanel((p) => !p)}
            title={showPanel ? 'Paneli Gizle' : 'Paneli Göster'}
          >
            <GridFourIcon size={16} weight={showPanel ? 'fill' : 'regular'} />
          </button>

          {/* Tam ekran — yalnızca panorama modunda */}
          {isPanorama && (
            <button
              className={`${styles.ctrlBtn} ${styles.btnFullscreen}`}
              onClick={handleFullscreen}
              title="Tam Ekran"
            >
              <CornersOutIcon size={16} />
            </button>
          )}

          {/* Ayarlar — yalnızca panorama modunda */}
          {isPanorama && (
            <button
              className={`${styles.ctrlBtn} ${styles.btnGear}`}
              onClick={() => setShowSettings((s) => !s)}
              title="Görüntüleme Ayarları"
            >
              <GearIcon size={16} weight={showSettings ? 'fill' : 'regular'} />
            </button>
          )}

          {/* Ayarlar paneli */}
          {isPanorama && showSettings && (
            <div className={styles.settingsPanel}>
              <p className={styles.settingsTitle}>Görüntüleme Modu</p>
              <div className={styles.settingsGroup}>
                {(['normal', 'cardboard', 'stereoscopic'] as PanoMode[]).map((m) => {
                  const labels: Record<PanoMode, string> = {
                    normal:       'Normal',
                    cardboard:    'Cardboard (VR)',
                    stereoscopic: 'Stereoskopik',
                  };
                  return (
                    <button
                      key={m}
                      className={`${styles.settingsBtn} ${panoMode === m ? styles.settingsBtnActive : ''}`}
                      onClick={() => handleModeSelect(m)}
                    >
                      {labels[m]}
                    </button>
                  );
                })}
              </div>

              {panoMode === 'normal' && (
                <>
                  <div className={styles.settingsDivider} />
                  <p className={styles.settingsTitle}>Kontrol</p>
                  <div className={styles.settingsGroup}>
                    {(['mouse', 'sensor'] as PanoControl[]).map((c) => (
                      <button
                        key={c}
                        className={`${styles.settingsBtn} ${panoControl === c ? styles.settingsBtnActive : ''}`}
                        onClick={() => setPanoControl(c)}
                      >
                        {c === 'mouse' ? 'Fare' : 'Sensör (Jiroskop)'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
