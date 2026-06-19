import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPageIntro',
  title: 'Hakkımızda — Tanıtım Bölümü',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa Hakkımızda sayfasındaki Tanıtım bölümü görünmez.',
      initialValue: true,
    }),
    defineField({ name: 'tag',           title: 'Etiket',                          type: 'string', initialValue: 'Biz Kimiz' }),
    defineField({ name: 'heading',       title: 'Başlık (normal font)',             type: 'string' }),
    defineField({ name: 'headingAccent', title: 'Başlık Vurgu (el yazısı, turuncu)', type: 'string' }),
    defineField({ name: 'description', title: 'Açıklama (her satır ayrı paragraf)', type: 'text', rows: 6 }),
    defineField({
      name: 'features',
      title: 'Beceri / Hizmet Listesi',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Öğe',
          fields: [
            defineField({ name: 'label', title: 'Metin', type: 'string' }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
    }),
    defineField({ name: 'image',      title: 'Görsel',        type: 'image', options: { hotspot: true } }),
    defineField({ name: 'buttonText', title: 'Buton Metni',   type: 'string', initialValue: 'Projelerimize Bakın' }),
    defineField({ name: 'buttonHref', title: 'Buton Linki',   type: 'string', initialValue: '/projeler' }),
  ],
});
