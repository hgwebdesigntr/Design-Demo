import Link from 'next/link';
import Image from 'next/image';
import { getHizmetlerPage, getServices } from '@/sanity/lib/queries';

interface HizmetService {
  _id: string;
  order?: number;
  title: string;
  scriptText?: string;
  description?: string;
  scopeItems?: string[];
  active?: boolean;
}

interface HizmetlerPageData {
  bannerTag?: string;
  bannerHeading?: string;
  bannerImage?: { asset: { url: string } };
  ctaHeading?: string;
  ctaScriptHeading?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

const fallbackServices: HizmetService[] = [
  {
    _id: '1', order: 1,
    title: 'İç Mimari Tasarım',
    scriptText: 'Tasarım',
    description: 'Yaşam alanlarınızı işlevsel, estetik ve size özgü bir anlayışla tasarlıyoruz. Konsept geliştirmeden uygulama planına kadar tüm süreç titizlikle yönetilir.',
    scopeItems: ['Mekan analizi ve ölçüm', 'Konsept geliştirme', '3D görselleştirme', 'Malzeme ve renk seçimi', 'Teknik çizimler'],
  },
  {
    _id: '2', order: 2,
    title: 'Konsept Geliştirme',
    scriptText: 'Hayal',
    description: 'Sizi tanıyoruz, hayallerinizi dinliyoruz ve beklentilerinizi karşılayan özgün konseptler üretiyoruz. Her mekan, size anlatacak bir hikayesi olan bir tasarıma kavuşur.',
    scopeItems: ['Moodboard hazırlama', 'Stil ve tarz belirleme', 'Renk paleti oluşturma', 'Malzeme kütüphanesi', 'Referans analizi'],
  },
  {
    _id: '3', order: 3,
    title: 'Uygulama & Koordinasyon',
    scriptText: 'Uygulama',
    description: 'Tasarımı hayata geçirme aşamasında tüm süreçleri koordine ediyoruz. Ustalardan tedarikçilere kadar her paydaş titizlikle yönetilir.',
    scopeItems: ['Şantiye koordinasyonu', 'Tedarikçi yönetimi', 'Kalite kontrol', 'Süreç takibi', 'Teslim denetimi'],
  },
  {
    _id: '4', order: 4,
    title: 'Tadilat & Yenileme',
    scriptText: 'Yenileme',
    description: 'Mevcut mekanlarınızı çağdaş bir anlayışla yeniden yorumluyoruz. Küçük dokunuşlardan komple renovasyona kadar her ölçekte hizmet veriyoruz.',
    scopeItems: ['Mekan değerlendirme', 'Maliyet analizi', 'Renovasyon planlaması', 'Malzeme yenileme', 'Proje yönetimi'],
  },
];

export default async function Hizmetler() {
  let pageData: HizmetlerPageData | null = null;
  let services: HizmetService[] = [];

  try {
    const [rawPage, rawServices] = await Promise.all([
      getHizmetlerPage(),
      getServices(),
    ]);
    pageData = rawPage ?? null;
    services = ((rawServices || []) as HizmetService[]).filter(s => s.active !== false);
  } catch (err) {
    console.error('[Sanity] Veri çekme hatası:', err);
  }

  const displayServices = services.length > 0 ? services : fallbackServices;

  const bannerTag         = pageData?.bannerTag         ?? 'Ne Yapıyoruz';
  const bannerHeading     = pageData?.bannerHeading     ?? 'Hizmetlerimiz';
  const ctaHeading        = pageData?.ctaHeading        ?? 'Projeniz İçin';
  const ctaScriptHeading  = pageData?.ctaScriptHeading  ?? 'Hemen Başlayalım.';
  const ctaButtonText     = pageData?.ctaButtonText     ?? 'Teklif Al';
  const ctaButtonHref     = pageData?.ctaButtonHref     ?? '/iletisim';

  return (
    <>
      {/* Banner */}
      <section className="relative h-80 bg-[#1B3A4B] flex items-end pt-20 overflow-hidden">
        {pageData?.bannerImage?.asset?.url && (
          <Image
            src={pageData.bannerImage.asset.url}
            alt={bannerHeading}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-14 w-full relative z-10">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C4622D] mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#C4622D]" /> {bannerTag}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-white">{bannerHeading}</h1>
        </div>
      </section>

      {/* Hizmet listesi */}
      <section className="bg-[#F5F0E8] py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-0 divide-y divide-[#D4C5A9]">
          {displayServices.map((s, i) => {
            const scopeItems = s.scopeItems ?? [];
            return (
              <div key={s._id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20">
                <div>
                  {s.scriptText && (
                    <span className="font-script text-8xl text-[#D4C5A9] leading-none block mb-4">
                      {s.scriptText}
                    </span>
                  )}
                  <h2 className="font-serif text-4xl text-[#1B3A4B] mb-6">{s.title}</h2>
                  {s.description && (
                    <p className="text-[#2C2C2C]/60 text-sm leading-relaxed">{s.description}</p>
                  )}
                </div>
                {scopeItems.length > 0 && (
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#C4622D] mb-6 flex items-center gap-3">
                      <span className="w-5 h-px bg-[#C4622D]" /> Kapsam
                    </h3>
                    <ul className="space-y-3">
                      {scopeItems.map((item, j) => (
                        <li key={j} className="flex items-center gap-4 text-sm text-[#2C2C2C]/65">
                          <span className="w-2 h-2 rounded-full bg-[#C4622D] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B3A4B] py-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/3" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="font-serif text-4xl text-white leading-[1.2] mb-1">{ctaHeading}</h2>
            <span className="font-script text-5xl text-[#C4622D] leading-[1.4] block">{ctaScriptHeading}</span>
          </div>
          <Link
            href={ctaButtonHref}
            className="inline-flex items-center gap-3 bg-[#C4622D] text-white text-[10px] tracking-[0.3em] uppercase px-10 py-5 rounded-full hover:bg-[#a8522a] transition-colors whitespace-nowrap"
          >
            {ctaButtonText} →
          </Link>
        </div>
      </section>
    </>
  );
}
