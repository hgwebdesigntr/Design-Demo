import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Marka Adı', type: 'string', initialValue: 'Armel Design' }),
    defineField({ name: 'tagline', title: 'Slogan / Alt Başlık', type: 'string', initialValue: 'İç Mimarlık' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string' }),
    defineField({ name: 'address', title: 'Adres', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram Kullanıcı Adı', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'string' }),
    defineField({ name: 'pinterest', title: 'Pinterest URL', type: 'string' }),
    defineField({
      name: 'footerText',
      title: 'Footer Açıklaması',
      type: 'text',
      rows: 2,
      initialValue: 'Tasarım, üretim ve uygulama aşamalarında yanınızdayız.',
    }),
  ],
  preview: {
    prepare: () => ({ title: '⚙️ Site Ayarları' }),
  },
});
