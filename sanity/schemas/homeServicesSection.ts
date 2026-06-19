import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homeServicesSection',
  title: 'Ana Sayfa — Hizmetler Bölümü',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa ana sayfadaki Hizmetler bölümü görünmez.',
      initialValue: true,
    }),
    defineField({
      name: 'bgImage',
      title: 'Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Hizmetler bölümünün arka planında görünecek fotoğraf',
    }),
    defineField({
      name: 'tag',
      title: 'Etiket Yazısı',
      type: 'string',
      initialValue: 'HİZMETLERİMİZ',
    }),
    defineField({
      name: 'heading',
      title: 'Ana Başlık',
      type: 'string',
      initialValue: 'Size Özel Tasarlanan Hizmetler',
    }),
    defineField({
      name: 'subheading',
      title: 'Alt Başlık',
      type: 'string',
      initialValue: 'Konseptten teslimata, her adımda yanınızdayız.',
    }),
  ],
  preview: {
    prepare: () => ({ title: '🔧 Hizmetler Bölümü Ayarları' }),
  },
});
