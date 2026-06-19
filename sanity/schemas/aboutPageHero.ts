import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPageHero',
  title: 'Hakkımızda — Hero Bölümü',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa Hakkımızda sayfasındaki Hero bölümü görünmez.',
      initialValue: true,
    }),
    defineField({ name: 'tag',           title: 'Etiket',                         type: 'string', initialValue: 'Hakkımızda' }),
    defineField({ name: 'heading',       title: 'Başlık (normal font)',            type: 'string' }),
    defineField({ name: 'headingAccent', title: 'Başlık Vurgu (el yazısı, turuncu)', type: 'string' }),
    defineField({ name: 'subheading',   title: 'Alt Metin',                       type: 'text', rows: 2 }),
    defineField({ name: 'image',      title: 'Arka Plan Görseli', type: 'image', options: { hotspot: true } }),
  ],
});
