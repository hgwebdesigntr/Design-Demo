import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutContent',
  title: 'Hakkımızda İçeriği',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa ana sayfadaki Hakkımızda bölümü görünmez.',
      initialValue: true,
    }),
    defineField({ name: 'tag', title: 'Etiket (örn: Hakkımızda)', type: 'string', initialValue: 'Hakkımızda' }),
    defineField({ name: 'heading', title: 'Ana Başlık', type: 'string', initialValue: 'Yenilikçi Mekanlar, İlham Veren Yaşamlar' }),
    defineField({ name: 'missionTitle', title: 'Misyon Başlığı', type: 'string', initialValue: 'Misyon & Amaç' }),
    defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 3 }),
    defineField({
      name: 'missionPoints',
      title: 'Misyon Maddeleri',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ok işaretiyle listelenecek maddeler',
    }),
    defineField({ name: 'buttonText', title: 'Buton Metni', type: 'string', initialValue: 'Daha Fazlası' }),
    defineField({ name: 'buttonHref', title: 'Buton Linki', type: 'string', initialValue: '/hakkimizda' }),

    defineField({ name: 'yearsOfExperience', title: 'Deneyim Yılı', type: 'number', initialValue: 10 }),
    defineField({ name: 'projectCount', title: 'Tamamlanan Proje', type: 'number', initialValue: 50 }),
    defineField({ name: 'cityCount', title: 'Şehir Sayısı', type: 'number', initialValue: 5 }),

    defineField({
      name: 'mainImage',
      title: 'Sol Kart Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description: 'Kartın içinde görünecek iç mekan fotoğrafı',
    }),

    defineField({
      name: 'reviewsBgImage',
      title: 'Google Yorumlar Kart Arka Plan Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description: 'Sağdaki koyu Google yorumlar kartının arka planında görünecek iç mekan fotoğrafı',
    }),
    defineField({ name: 'awardText', title: 'Ödül/Rozet Metni', type: 'string', initialValue: "Güvenilir Tasarım Firması '25" }),
    defineField({
      name: 'googlePlaceId',
      title: 'Google Place ID',
      type: 'string',
      description: 'Google Maps\'ten alınan işletme ID\'si (örn: ChIJ...). Otomatik puan çekmek için gerekli.',
    }),
    defineField({
      name: 'googleReviewsUrl',
      title: 'Google Yorumlar Sayfası URL',
      type: 'string',
      description: 'Kullanıcılar Google ikonuna tıkladığında açılacak yorumlar sayfası linki',
    }),
  ],
  preview: {
    prepare: () => ({ title: '📄 Hakkımızda İçeriği' }),
  },
});
