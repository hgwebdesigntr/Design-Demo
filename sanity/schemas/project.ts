import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Proje',
  type: 'document',
  fields: [
    // ── Temel Bilgiler ────────────────────────────
    defineField({ name: 'title', title: 'Proje Adı', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL adresi)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Otomatik oluşturulur — "Oluştur" a basın',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'featured', title: 'Ana sayfada göster', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Sıra', type: 'number', initialValue: 99 }),

    // ── Hero Görselleri (Sayfa 1: Hero) ──────────
    defineField({
      name: 'bannerImage',
      title: 'Hero Banner Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Detay sayfası hero alanının arka planı. Boş bırakılırsa Kapak Görseli kullanılır.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli (Liste ve Kartlar)',
      type: 'image',
      options: { hotspot: true },
      description: 'Projeler listesinde, ana sayfada ve ilgili projeler kartlarında görünür.',
      validation: (R) => R.required(),
    }),

    // ── Genel Bakış (Sayfa 2: Açıklama) ──────────
    defineField({ name: 'description', title: 'Kısa Açıklama', type: 'text', rows: 3 }),

    // ── Proje Bilgileri (Sayfa 3: Meta grid — sol→sağ, üst→alt) ──
    defineField({ name: 'client', title: 'Müşteri / İşveren', type: 'string' }),
    defineField({ name: 'year', title: 'Tamamlanma Yılı', type: 'string' }),
    defineField({ name: 'area', title: 'Alan (m²)', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Konut', value: 'Konut' },
          { title: 'Villa', value: 'Villa' },
          { title: 'Rezidans', value: 'Rezidans' },
          { title: 'Ticari', value: 'Ticari' },
          { title: 'Ofis', value: 'Ofis' },
          { title: 'Otel', value: 'Otel' },
        ],
      },
    }),
    defineField({ name: 'location', title: 'Konum', type: 'string' }),
    defineField({
      name: 'duration',
      title: 'Proje Süresi',
      type: 'string',
      description: 'Örn: 8 Ay, 1 Yıl',
    }),

    // ── Galeri (Sayfa 3: Beyaz kart alt) ─────────
    defineField({
      name: 'gallery',
      title: 'Galeri Fotoğrafları',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'İstediğiniz kadar fotoğraf ekleyebilirsiniz',
    }),

    // ── Öne Çıkan Özellikler (Sayfa 5) ───────────
    defineField({
      name: 'details',
      title: 'Özellikler Açıklama Metni',
      type: 'text',
      rows: 3,
      description: 'Öne Çıkan Özellikler bölümünün üstünde turuncu renkte gösterilir.',
    }),
    defineField({
      name: 'steps',
      title: 'Öne Çıkan Özellikler',
      type: 'array',
      description: 'Her madde ♦ ikonuyla numaralı liste olarak gösterilir.',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'label', title: 'Özellik', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'label' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Özellik' };
            },
          },
        },
      ],
    }),

    // ── İndirilebilir Dosyalar ────────────────────
    defineField({
      name: 'files',
      title: 'İndirilebilir Dosyalar',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Dosya',
          fields: [
            defineField({ name: 'label', title: 'Dosya Adı / Buton Etiketi', type: 'string' }),
            defineField({ name: 'file', title: 'Dosya', type: 'file' }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
    }),
  ],
  orderings: [
    { title: 'Sıraya Göre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'coverImage' },
  },
});
