import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { getService, getServices } from '@/sanity/lib/queries';

export async function generateStaticParams() {
  const services = await getServices();
  return (services || [])
    .filter((s: { slug?: string }) => s.slug)
    .map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#1B3A4B]">
        {service.image?.asset?.url && (
          <Image
            src={service.image.asset.url}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 lg:px-10 max-w-5xl mx-auto">
          {service.categoryLabel && (
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-3">
              — {service.categoryLabel}
            </p>
          )}
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight">
            {service.title}
          </h1>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <div className="max-w-2xl">
          {service.description && (
            <p className="text-[#2C2C2C]/70 text-lg leading-relaxed mb-10">
              {service.description}
            </p>
          )}
          <Link href="/hizmetler" className="btn">
            <span className="btn-icon"><ArrowLeft size={16} /></span>
            <span className="btn-text">Tüm Hizmetler</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
