import { getPopupSettings, getSiteSettings } from '@/sanity/lib/queries';
import PopupClient from './PopupClient';

export default async function PopupWrapper() {
  const [popup, site] = await Promise.all([
    getPopupSettings(),
    getSiteSettings(),
  ]);

  return <PopupClient popup={popup ?? null} site={site ?? null} />;
}
