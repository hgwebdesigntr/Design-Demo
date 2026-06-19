import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Hizmet',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Hizmeti Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa bu hizmet Hizmetler sayfasında görünmez.',
      initialValue: true,
    }),
    defineField({ name: 'order', title: 'Sıra', type: 'number', initialValue: 1 }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Hizmet detay sayfası URL\'i — "Otomatik Oluştur" butonuna basın',
      options: { source: 'title', maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'icon',
      title: 'İkon',
      type: 'string',
      options: {
        list: [
          { title: 'İç Mimari (ev)', value: 'interior' },
          { title: 'Konsept (ampul)', value: 'concept' },
          { title: 'Uygulama (belge)', value: 'application' },
          { title: 'Renovasyon (kalem)', value: 'renovation' },
        ],
      },
    }),
    defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'categoryLabel',
      title: 'Kategori Etiketi',
      type: 'string',
      description: 'Kart üst alanında büyük harfle görünen kısa etiket (örn: İÇ MİMARİ)',
      initialValue: '',
    }),
    defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 3 }),
    defineField({
      name: 'scriptText',
      title: 'El Yazısı Dekoratif Metin',
      type: 'string',
      description: 'Hizmetler sayfasında başlığın arkasında büyük el yazısıyla görünür (örn: Tasarım, Hayal, Uygulama)',
    }),
    defineField({
      name: 'scopeItems',
      title: 'Kapsam Listesi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Hizmetin kapsamını gösteren madde listesi (sağ sütunda gösterilir)',
    }),
    defineField({
      name: 'image',
      title: 'Kart Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Kart üzerine gelinince gösterilecek fotoğraf',
    }),
  ],
  orderings: [{ title: 'Sıraya Göre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'order', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: `${subtitle}. ${title}`, media };
    },
  },
});
