import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homeStyleFinderSection',
  title: 'Ana Sayfa — Tasarım Stili Bulucu',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: '🟢 Bölümü Aktif Et',
      type: 'boolean',
      description: 'Kapalıysa ana sayfadaki Stili Bulucu bölümü görünmez.',
      initialValue: true,
    }),
    /* ── Üst Alan ── */
    defineField({
      name: 'decorativeImage',
      title: 'Dekoratif Görsel (üstten taşan)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tag',
      title: 'Etiket Metni',
      type: 'string',
      initialValue: 'Tasarım Tarzını Bul',
    }),
    defineField({
      name: 'heading',
      title: 'Ana Başlık',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Alt Açıklama Metni',
      type: 'text',
      rows: 2,
    }),

    /* ── Kart Statik İçerik (tüm sekmelerde sabit) ── */
    defineField({
      name: 'cardDescription',
      title: 'Kart Açıklaması',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Özellikler (en fazla 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Özellik',
          fields: [
            defineField({ name: 'label', title: 'Başlık', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'İkon',
              type: 'string',
              options: {
                list: [
                  { title: '🛋️ Kanepe',            value: 'Couch' },
                  { title: '💺 Koltuk',             value: 'Armchair' },
                  { title: '🪑 Sandalye',           value: 'Chair' },
                  { title: '🏠 Ev',                 value: 'House' },
                  { title: '💡 Lamba',              value: 'Lamp' },
                  { title: '🎨 Palet',              value: 'Palette' },
                  { title: '🖌️ Boya Fırçası',       value: 'PaintBrush' },
                  { title: '🖼️ Boya Rulosu',        value: 'PaintRoller' },
                  { title: '📐 Cetvel',             value: 'Ruler' },
                  { title: '⭐ Yıldız',             value: 'Star' },
                  { title: '✨ Parlaklık',           value: 'Sparkle' },
                  { title: '💎 Elmas',              value: 'Diamond' },
                  { title: '👑 Taç',                value: 'Crown' },
                  { title: '🪄 Sihirli Değnek',     value: 'MagicWand' },
                  { title: '🌿 Yaprak',             value: 'Leaf' },
                  { title: '🌱 Bitki',              value: 'Plant' },
                  { title: '🌸 Çiçek',              value: 'Flower' },
                  { title: '🪶 Tüy',                value: 'Feather' },
                  { title: '❤️ Kalp',               value: 'Heart' },
                  { title: '🛡️ Kalkan',             value: 'Shield' },
                  { title: '🏆 Kupa',               value: 'Trophy' },
                  { title: '🏅 Madalya',            value: 'Medal' },
                  { title: '🎖️ Sertifika',          value: 'Certificate' },
                  { title: '✅ Onay',               value: 'CheckCircle' },
                  { title: '🔧 Anahtar',            value: 'Wrench' },
                  { title: '🔥 Ateş / Şömine',     value: 'Fire' },
                  { title: '☀️ Güneş',              value: 'Sun' },
                  { title: '💨 Hava',               value: 'Wind' },
                  { title: '🟦 Küp / 3D',           value: 'Cube' },
                ],
                layout: 'dropdown',
              },
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'icon' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Özellik', subtitle: subtitle || '—' };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ctaText',
      title: 'Buton Metni',
      type: 'string',
      initialValue: 'Daha Fazlası',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Buton Linki',
      type: 'string',
      initialValue: '/hizmetler',
    }),

    /* ── Sekmeler ── */
    defineField({
      name: 'tabs',
      title: 'Sekmeler (en fazla 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Sekme',
          fields: [
            defineField({ name: 'title', title: 'Sekme Başlığı', type: 'string' }),
            defineField({
              name: 'mediaType',
              title: 'Medya Türü',
              type: 'string',
              options: {
                list: [
                  { title: '🔵 360° Panorama', value: 'panorama' },
                  { title: '▶️ Video', value: 'video' },
                  { title: '🖼️ Görsel', value: 'image' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            }),
            /* 360° panorama */
            defineField({
              name: 'panoramaImage',
              title: 'Panorama Görseli (dosya yükle)',
              type: 'image',
              hidden: ({ parent }) => (parent as { mediaType?: string })?.mediaType !== 'panorama',
            }),
            defineField({
              name: 'panoramaUrl',
              title: 'Panorama URL (harici link — dosya yüklenmediyse kullanılır)',
              type: 'string',
              hidden: ({ parent }) => (parent as { mediaType?: string })?.mediaType !== 'panorama',
            }),
            /* Video */
            defineField({
              name: 'videoSource',
              title: 'Video Kaynağı',
              type: 'string',
              options: {
                list: [
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Kendi Sunucu (self-hosted)', value: 'selfhosted' },
                ],
                layout: 'radio',
              },
              hidden: ({ parent }) => (parent as { mediaType?: string })?.mediaType !== 'video',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL (YouTube linki veya MP4 adresi)',
              type: 'string',
              hidden: ({ parent }) => (parent as { mediaType?: string })?.mediaType !== 'video',
            }),
            /* Standart görsel */
            defineField({
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => (parent as { mediaType?: string })?.mediaType !== 'image',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'mediaType' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              const labelMap: Record<string, string> = {
                panorama: '🔵 360° Panorama',
                video: '▶️ Video',
                image: '🖼️ Görsel',
              };
              return {
                title: title || 'Sekme',
                subtitle: labelMap[subtitle ?? ''] ?? subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
