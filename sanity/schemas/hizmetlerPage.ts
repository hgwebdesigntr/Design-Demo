import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hizmetlerPage',
  title: 'Hizmetler Sayfası Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTag',
      title: 'Banner Üst Etiket',
      type: 'string',
      initialValue: 'Ne Yapıyoruz',
    }),
    defineField({
      name: 'bannerHeading',
      title: 'Banner Ana Başlık',
      type: 'string',
      initialValue: 'Hizmetlerimiz',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner arka planında görünecek fotoğraf (koyu tonlu görseller önerilir)',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Başlık (normal font)',
      type: 'string',
      initialValue: 'Projeniz İçin',
    }),
    defineField({
      name: 'ctaScriptHeading',
      title: 'CTA Alt Başlık (el yazısı, turuncu)',
      type: 'string',
      initialValue: 'Hemen Başlayalım.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Buton Metni',
      type: 'string',
      initialValue: 'Teklif Al',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA Buton Linki',
      type: 'string',
      initialValue: '/iletisim',
    }),
  ],
  preview: {
    prepare: () => ({ title: '🔧 Hizmetler Sayfası Ayarları' }),
  },
});
