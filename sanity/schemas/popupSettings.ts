import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'popupSettings',
  title: 'Pop-up Ayarları',
  type: 'document',
  groups: [
    { name: 'general', title: 'Genel Ayarlar' },
    { name: 'content', title: 'İçerik' },
  ],
  fields: [
    defineField({
      name: 'active',
      title: 'Pop-up\'ı Aktif Et',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'showOnAllPages',
      title: 'Tüm Sayfalarda Göster',
      description: 'Kapalı bırakılırsa pop-up yalnızca ana sayfada görünür.',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'delaySeconds',
      title: 'Gecikme Süresi (saniye)',
      description: 'Site açıldıktan kaç saniye sonra pop-up çıksın? (0 = anında)',
      type: 'number',
      initialValue: 2,
      group: 'general',
    }),
    defineField({
      name: 'showAfterClose',
      title: 'Kapatıldıktan Sonra Tekrar Göster',
      description: 'Açık olursa kullanıcı pop-up\'ı kapattıktan sonra sayfayı yenilese bile tekrar görünür.',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'bgImage',
      title: 'Arka Plan Görseli',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'tag',
      title: 'Etiket Yazısı',
      description: 'Başlığın üzerindeki küçük etiket (örn: "İLETİŞİM")',
      type: 'string',
      initialValue: 'İLETİŞİM',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Ana Başlık',
      type: 'string',
      initialValue: 'Hayalinizi Birlikte Tasarlayalım',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Alt Başlık',
      type: 'text',
      rows: 2,
      initialValue: 'Bize ulaşın, hayalinizdeki mekanı birlikte şekillendirelim.',
      group: 'content',
    }),
  ],
  preview: {
    prepare: () => ({ title: '🪟 Pop-up Ayarları' }),
  },
});
