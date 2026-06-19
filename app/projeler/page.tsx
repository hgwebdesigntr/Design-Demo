import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/sanity/lib/queries';

interface Project {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  category?: string;
  year?: string;
  coverImage?: { asset: { url: string } };
}

const gradients = [
  'from-[#C9AA7C] to-[#7A5C42]',
  'from-[#8FA89B] to-[#3D5A52]',
  'from-[#C4B09A] to-[#7A5C42]',
  'from-[#B8A898] to-[#5C4A35]',
  'from-[#9BB0C1] to-[#2C4A5A]',
  'from-[#D4C5A9] to-[#8B7355]',
];

const fallbackProjects: Project[] = [
  { _id: '1', title: 'Modern Konut',   slug: 'modern-konut',   location: 'İstanbul', category: 'Konut',    year: '2024' },
  { _id: '2', title: 'Özel Villa',     slug: 'ozel-villa',     location: 'Bodrum',   category: 'Villa',    year: '2024' },
  { _id: '3', title: 'Lüks Rezidans',  slug: 'luks-rezidans',  location: 'İzmir',    category: 'Rezidans', year: '2023' },
  { _id: '4', title: 'Butik Otel',     slug: 'butik-otel',     location: 'Antalya',  category: 'Ticari',   year: '2023' },
  { _id: '5', title: 'Ofis Tasarımı',  slug: 'ofis-tasarimi',  location: 'İstanbul', category: 'Ticari',   year: '2022' },
  { _id: '6', title: 'Çift Katlı Daire', slug: 'cift-katli-daire', location: 'Ankara', category: 'Konut', year: '2022' },
];

export default async function Projeler() {
  let projects: Project[] = [];

  try {
    const raw = await getAllProjects();
    projects = (raw || []) as Project[];
  } catch (err) {
    console.error('[Sanity] Projeler çekme hatası:', err);
  }

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <>
      {/* Banner */}
      <section className="relative h-72 bg-[#1B3A4B] flex items-end pt-20 overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4622D] mb-3">Portföy</p>
          <h1 className="font-serif text-5xl text-white">Projelerimiz</h1>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#F5F0E8] py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((p, i) => (
              <Link key={p._id} href={`/projeler/${p.slug}`} className="group block">
                <div className="relative h-80 overflow-hidden rounded-xl mb-5 bg-[#1B3A4B]">
                  {p.coverImage?.asset?.url ? (
                    <Image
                      src={p.coverImage.asset.url}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                  )}
                  <div className="absolute inset-0 bg-[#1B3A4B]/0 group-hover:bg-[#1B3A4B]/20 transition-colors duration-300" />
                  {p.category && (
                    <span className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase text-white/80 bg-black/25 px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  )}
                  {p.year && (
                    <span className="absolute bottom-4 right-4 text-[9px] tracking-wider text-white/60">
                      {p.year}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-[10px] tracking-[0.3em] uppercase border border-white/60 px-5 py-2">
                      İncele →
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-[#1B3A4B] group-hover:text-[#C4622D] transition-colors mb-1">
                  {p.title}
                </h3>
                {p.location && (
                  <p className="text-[#2C2C2C]/50 text-sm">{p.location}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
