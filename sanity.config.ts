import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './sanity/schemas';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Armel Design Panel',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sayfa Yönetimi')
          .items([

            /* ──────────────────────────────
               🏠 ANA SAYFA
            ────────────────────────────── */
            S.listItem()
              .title('🏠 Ana Sayfa')
              .child(
                S.list()
                  .title('Ana Sayfa Bölümleri')
                  .items([
                    S.listItem()
                      .title('① 🖼️ Hero Slaytlar')
                      .child(
                        S.documentTypeList('heroSlide')
                          .title('Hero Slaytlar')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('② ✨ Hakkımızda Bölümü')
                      .child(
                        S.document()
                          .schemaType('aboutContent')
                          .documentId('aboutContent')
                          .title('Hakkımızda Bölümü')
                      ),
                    S.listItem()
                      .title('③ 🔧 Hizmetler Bölümü Ayarları')
                      .child(
                        S.document()
                          .schemaType('homeServicesSection')
                          .documentId('homeServicesSection')
                          .title('Hizmetler Bölümü Ayarları')
                      ),
                    S.listItem()
                      .title('④ 📊 İstatistikler Bölümü')
                      .child(
                        S.document()
                          .schemaType('homeStatsSection')
                          .documentId('homeStatsSection')
                          .title('İstatistikler Bölümü')
                      ),
                    S.listItem()
                      .title('⑤ 🏛️ Öne Çıkan Projeler')
                      .child(
                        S.documentTypeList('project')
                          .title('Öne Çıkan Projeler')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('⑥ 🎨 Tasarım Stili Bulucu')
                      .child(
                        S.document()
                          .schemaType('homeStyleFinderSection')
                          .documentId('homeStyleFinderSection')
                          .title('Tasarım Stili Bulucu')
                      ),
                  ])
              ),

            S.divider(),

            /* ──────────────────────────────
               👤 HAKKIMIZDA SAYFASI
            ────────────────────────────── */
            S.listItem()
              .title('👤 Hakkımızda Sayfası')
              .child(
                S.list()
                  .title('Hakkımızda Sayfası Bölümleri')
                  .items([
                    S.listItem()
                      .title('① 🖼️ Hero Bölümü')
                      .child(
                        S.document()
                          .schemaType('aboutPageHero')
                          .documentId('aboutPageHero')
                          .title('Hero Bölümü')
                      ),
                    S.listItem()
                      .title('② 📝 Tanıtım Bölümü')
                      .child(
                        S.document()
                          .schemaType('aboutPageIntro')
                          .documentId('aboutPageIntro')
                          .title('Tanıtım Bölümü')
                      ),
                    S.listItem()
                      .title('③ 🔧 Hizmetler Bölümü')
                      .child(
                        S.document()
                          .schemaType('aboutPageServices')
                          .documentId('aboutPageServices')
                          .title('Hizmetler Bölümü')
                      ),
                    S.listItem()
                      .title('④ 🏆 Ödüller & Başarılar')
                      .child(
                        S.document()
                          .schemaType('aboutPageTimeline')
                          .documentId('aboutPageTimeline')
                          .title('Ödüller & Başarılar')
                      ),
                  ])
              ),

            S.divider(),

            /* ──────────────────────────────
               🏛️ PROJELER SAYFASI
            ────────────────────────────── */
            S.listItem()
              .title('🏛️ Projeler Sayfası')
              .child(
                S.list()
                  .title('Projeler')
                  .items([
                    S.listItem()
                      .title('📁 Tüm Projeler')
                      .child(
                        S.documentTypeList('project')
                          .title('Tüm Projeler')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                  ])
              ),

            S.divider(),

            /* ──────────────────────────────
               🔧 HİZMETLER SAYFASI
            ────────────────────────────── */
            S.listItem()
              .title('🔧 Hizmetler Sayfası')
              .child(
                S.list()
                  .title('Hizmetler Sayfası')
                  .items([
                    S.listItem()
                      .title('① ⚙️ Sayfa Ayarları (Banner & CTA)')
                      .child(
                        S.document()
                          .schemaType('hizmetlerPage')
                          .documentId('hizmetlerPage')
                          .title('Sayfa Ayarları')
                      ),
                    S.listItem()
                      .title('② 🔧 Hizmet Listesi')
                      .child(
                        S.documentTypeList('service')
                          .title('Hizmet Listesi')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                  ])
              ),

            S.divider(),

            /* ──────────────────────────────
               ⚙️ GENEL AYARLAR
            ────────────────────────────── */
            S.listItem()
              .title('⚙️ Genel Ayarlar')
              .child(
                S.list()
                  .title('Genel Ayarlar')
                  .items([
                    S.listItem()
                      .title('⚙️ Site Bilgileri')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Bilgileri')
                      ),
                    S.listItem()
                      .title('🪟 Pop-up Ayarları')
                      .child(
                        S.document()
                          .schemaType('popupSettings')
                          .documentId('popupSettings')
                          .title('Pop-up Ayarları')
                      ),
                  ])
              ),

          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemas },
});
