import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeStatsSection',
  title: 'Ana Sayfa — İstatistikler Bölümü',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa ana sayfadaki İstatistikler bölümü görünmez.',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      title: 'Sol Görsel',
      type: 'image',
      options: { hotspot: true },
      description: 'Sol tarafta görünecek büyük görsel',
    }),
    defineField({
      name: 'tag',
      title: 'Etiket (küçük üst yazı)',
      type: 'string',
      initialValue: 'PERFORMANSIMIZ',
    }),
    defineField({
      name: 'heading',
      title: 'Ana Başlık',
      type: 'string',
      initialValue: 'Rakamlarla Armel Design',
    }),
    defineField({
      name: 'subheading',
      title: 'Açıklama Metni',
      type: 'text',
      rows: 2,
      initialValue: 'Kalitemizi, müşteri memnuniyetimizi ve lüks proje deneyimimizi yansıtan temel rakamlar.',
    }),
    defineField({
      name: 'stats',
      title: 'İstatistikler (İlerleme Çubukları)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'label', title: 'Etiket', type: 'string' }),
            defineField({
              name: 'value',
              title: 'Değer (0-100 arası yüzde)',
              type: 'number',
              validation: (R) => R.min(0).max(100).integer(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }: { title?: string; subtitle?: number }) {
              return { title, subtitle: subtitle != null ? `%${subtitle}` : '' };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaPretext',
      title: 'CTA Ön Metin',
      type: 'string',
      description: 'Butonun yanındaki küçük açıklama metni',
      initialValue: 'Etkilendiniz mi? Hemen harekete geçin.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Buton Metni',
      type: 'string',
      initialValue: 'Hemen Başlayalım',
    }),
    defineField({
      name: 'ctaType',
      title: 'CTA Tıklama Aksiyonu',
      type: 'string',
      options: {
        list: [
          { title: '🪟 Site Pop-up\'ını Aç', value: 'popup' },
          { title: '🔗 Linke Git', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'popup',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Hedef Link',
      type: 'string',
      description: 'Sadece "Linke Git" seçiliyse doldurun (örn: /iletisim)',
      hidden: ({ parent }) => parent?.ctaType !== 'link',
    }),
  ],
});
