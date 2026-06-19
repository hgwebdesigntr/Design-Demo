import { getAboutPageHero, getAboutPageIntro, getAboutPageServices, getAboutPageTimeline } from '@/sanity/lib/queries';
import AboutHeroSection from '@/components/AboutHeroSection';
import AboutIntroSection from '@/components/AboutIntroSection';
import AboutServicesSection from '@/components/AboutServicesSection';
import AboutTimelineSection from '@/components/AboutTimelineSection';

export default async function Hakkimizda() {
  const [hero, intro, services, timeline] = await Promise.all([
    getAboutPageHero().catch(() => null),
    getAboutPageIntro().catch(() => null),
    getAboutPageServices().catch(() => null),
    getAboutPageTimeline().catch(() => null),
  ]);

  return (
    <>
      {hero?.active     !== false && <AboutHeroSection    data={hero}     />}
      {intro?.active    !== false && <AboutIntroSection   data={intro}    />}
      {services?.active !== false && <AboutServicesSection data={services} />}
      {timeline?.active !== false && <AboutTimelineSection data={timeline} />}
    </>
  );
}
