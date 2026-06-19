import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPageTimeline',
  title: 'Hakkımızda — Ödüller & Başarılar',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa Hakkımızda sayfasındaki Ödüller & Başarılar bölümü görünmez.',
      initialValue: true,
    }),
    defineField({ name: 'tag',           title: 'Etiket',                          type: 'string', initialValue: 'Başarılarımız' }),
    defineField({ name: 'heading',       title: 'Başlık (normal font)',             type: 'string' }),
    defineField({ name: 'headingAccent', title: 'Başlık Vurgu (el yazısı, turuncu)', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Ödül / Başarı Öğeleri',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'item',
          title: 'Öğe',
          fields: [
            defineField({ name: 'year',        title: 'Yıl',      type: 'string' }),
            defineField({ name: 'title',       title: 'Başlık',   type: 'string' }),
            defineField({ name: 'description', title: 'Açıklama', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Öğe', subtitle: subtitle };
            },
          },
        },
      ],
    }),
  ],
});
