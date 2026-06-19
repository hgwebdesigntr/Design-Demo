import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slayt',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Slaytı Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa bu slayt slider\'da görünmez.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      description: 'Küçük sayı önce gösterilir',
      initialValue: 1,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'image',
      title: 'Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Tam ekran görünecek arka plan fotoğrafı',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      description: '× ile ayrılacak etiketler — örn: Modern, Klasik, Zarif',
    }),
    defineField({
      name: 'heading',
      title: 'Ana Başlık',
      type: 'string',
      description: 'Büyük fontla gösterilen başlık — örn: LUXURY LIVING INTERIORS',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Alt Başlık (İsteğe bağlı)',
      type: 'string',
    }),
    defineField({
      name: 'buttonText',
      title: 'Buton Metni',
      type: 'string',
      initialValue: 'Hizmetleri Keşfet',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Buton Linki',
      type: 'string',
      initialValue: '/hizmetler',
      description: 'Örn: /projeler veya /iletisim',
    }),
  ],
  orderings: [
    {
      title: 'Sıraya Göre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'heading', media: 'image', subtitle: 'order' },
    prepare({ title, media, subtitle }) {
      return { title: `${subtitle}. ${title}`, media };
    },
  },
});
