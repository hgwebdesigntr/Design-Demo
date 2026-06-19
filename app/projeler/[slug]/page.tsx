import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import GallerySlider from '@/components/GallerySlider';
import { getProject, getRelatedProjects } from '@/sanity/lib/queries';

interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  year?: string;
  area?: string;
  client?: string;
  duration?: string;
  description?: string;
  details?: string;
  bannerImage?: { asset: { url: string } };
  coverImage?: { asset: { url: string } };
  gallery?: { asset: { url: string } }[];
  files?: { label?: string; url?: string }[];
  steps?: { label: string }[];
  prev?: { title: string; slug: string } | null;
  next?: { title: string; slug: string } | null;
}

interface RelatedProject {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  category?: string;
  coverImage?: { asset: { url: string } };
}

export const dynamic = 'force-dynamic';

export default async function ProjeDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [project, related]: [ProjectData | null, RelatedProject[]] = await Promise.all([
    getProject(slug).catch(() => null),
    getRelatedProjects(slug).catch(() => []),
  ]);

  if (!project) notFound();

  const heroBg = project.bannerImage?.asset?.url ?? project.coverImage?.asset?.url;

  const metaItems = [
    { label: 'Müşteri',           value: project.client },
    { label: 'Tamamlanma Yılı',  value: project.year },
    { label: 'Alan',              value: project.area },
    { label: 'Kategori',          value: project.category },
    { label: 'Konum',             value: project.location },
    { label: 'Proje Süresi',      value: project.duration },
  ];

  const firstFile   = project.files?.find(f => f.url);
  const hasDownload = !!firstFile;

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO — tam genişlik, başlık sol-alt
          ══════════════════════════════════════ */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden bg-[#1B3A4B]">
        {heroBg && (
          <Image
            src={heroBg}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Başlık — sol alt, 900px içinde */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 w-full pb-14">
            <nav className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.25em] uppercase mb-5">
              <Link href="/" className="hover:text-white/80 transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/projeler" className="hover:text-white/80 transition-colors">Projeler</Link>
              <span>/</span>
              <span className="text-white/75">{project.title}</span>
            </nav>
            <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. AÇIKLAMA
          ══════════════════════════════════════ */}
      {project.description && (
        <section className="bg-[#F5F0E8] pt-16 pb-10">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#C4622D] mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-[#C4622D]" /> Genel Bakış
            </p>
            <p className="font-serif text-2xl lg:text-3xl text-[#1B3A4B] leading-snug">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          3. PROJE BİLGİLERİ + GALERİ — birleşik beyaz kart
          ══════════════════════════════════════ */}
      <section className="bg-[#F5F0E8] pb-14">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-[18px] overflow-hidden">
            {/* Grid — 10px padding her yönde */}
            <div className="p-[10px]">
              <div className="grid grid-cols-3 gap-px bg-[#D4C5A9] rounded-[10px] overflow-hidden">
                {metaItems.map(({ label, value }, index) => (
                  <div key={label} className={`bg-white p-[15px] ${index < 3 ? 'meta-row-top' : 'meta-row-bottom'}`}>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#2C2C2C]/40 mb-2">
                      {label}
                    </p>
                    <p className="font-serif text-[#1B3A4B] text-base leading-snug">{value || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 1px border — grid ile galeri arasında */}
            {project.gallery && project.gallery.length > 0 && (
              <>
                <div className="h-px bg-[#D4C5A9]" />
                <div className="p-[10px]">
                  <GallerySlider images={project.gallery} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. ONE CIKAN OZELLIKLER
          ══════════════════════════════════════ */}
      {(project.details || (project.steps && project.steps.length > 0)) && (
        <section className="bg-[#F5F0E8] pb-14">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <div className="flex gap-10 lg:gap-16">

              {/* Sol etiket */}
              <div className="w-60 flex-shrink-0 pt-1">
                <h3 className="font-semibold text-[#2C2C2C] text-xl leading-snug">
                  Öne Çıkan Özellikler
                </h3>
              </div>

              {/* Sag icerik */}
              <div className="flex-1">
                {project.details && (
                  <p className="text-[#C4622D] text-sm leading-relaxed mb-6">
                    {project.details}
                  </p>
                )}
                {project.steps && project.steps.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {project.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
                        <span className="text-[#1B3A4B] text-xs flex-shrink-0">♦</span>
                        <p className="flex-1 text-[#2C2C2C]/65 text-sm leading-relaxed">{step.label}</p>
                        <span className="text-[9px] tracking-[0.2em] text-[#2C2C2C]/30 tabular-nums flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          6. SOSYAL PAYLAŞIM + İNDİR
          ══════════════════════════════════════ */}
      <section className="bg-[#F5F0E8] border-t border-[#D4C5A9]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Sosyal linkler */}
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#2C2C2C]/40 mb-4">
                Bu Projeyi Paylaşın
              </p>
              <div className="flex items-center gap-2">
                {[
                  { href: 'https://www.instagram.com/', label: 'Instagram' },
                  { href: 'https://www.facebook.com/',  label: 'Facebook'  },
                  { href: 'https://twitter.com/',       label: 'Twitter'   },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-[#D4C5A9] text-[11px] tracking-wide text-[#2C2C2C]/55 hover:border-[#1B3A4B] hover:text-[#1B3A4B] hover:bg-white transition-all"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* İndirme butonu — yalnızca dosya varsa */}
            {hasDownload && (
              <a
                href={firstFile!.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <span className="btn-icon"><ArrowRight size={16} /></span>
                <span className="btn-text">{firstFile!.label || 'Proje Dosyasını İndir'}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. ÖNCEKİ / SONRAKİ
          ══════════════════════════════════════ */}
      {(project.prev || project.next) && (
        <section className="bg-[#F5F0E8] border-t border-[#D4C5A9]">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-8 flex items-center justify-between">
            {project.prev ? (
              <Link
                href={`/projeler/${project.prev.slug}`}
                className="group flex items-center gap-3 text-[#2C2C2C]/50 hover:text-[#1B3A4B] transition-colors"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5">Önceki</p>
                  <p className="font-serif text-[#1B3A4B] text-sm">{project.prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {project.next ? (
              <Link
                href={`/projeler/${project.next.slug}`}
                className="group flex items-center gap-3 text-[#2C2C2C]/50 hover:text-[#1B3A4B] transition-colors text-right"
              >
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5">Sonraki</p>
                  <p className="font-serif text-[#1B3A4B] text-sm">{project.next.title}</p>
                </div>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          8. DİĞER PROJELER
          ══════════════════════════════════════ */}
      {related && related.length > 0 && (
        <section className="bg-[#F5F0E8] border-t border-[#D4C5A9] py-16">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#2C2C2C]/40 mb-8">
              Diğer Projeler
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p._id} href={`/projeler/${p.slug}`} className="group block">
                  <div className="relative h-48 bg-[#1B3A4B] overflow-hidden rounded-xl mb-3">
                    {p.coverImage?.asset?.url && (
                      <Image
                        src={p.coverImage.asset.url}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
                    {p.category && (
                      <span className="absolute top-3 left-3 text-[8px] tracking-[0.25em] uppercase text-white/80 bg-black/30 px-2 py-1 rounded-full">
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-base text-[#1B3A4B] group-hover:text-[#C4622D] transition-colors leading-snug mb-0.5">
                        {p.title}
                      </h3>
                      {p.location && (
                        <p className="text-[#2C2C2C]/45 text-xs">{p.location}</p>
                      )}
                    </div>
                    <span className="text-[#C4622D] font-light text-xl leading-none mt-0.5 flex-shrink-0">+</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
