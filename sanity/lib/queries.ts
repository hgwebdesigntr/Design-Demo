import { client } from './client';

export async function getHeroSlides() {
  return client.fetch(
    `*[_type == "heroSlide" && active != false] | order(order asc) {
      _id, heading, tags, buttonText, buttonHref, subheading, order,
      image { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getFeaturedProjects() {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(order asc)[0...3] {
      _id, title, location, category, year,
      "slug": slug.current,
      coverImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getAllProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, title, location, category, year,
      "slug": slug.current,
      coverImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, location, category, year, area, description, details,
      client, duration,
      "slug": slug.current,
      bannerImage { asset->{ url } },
      coverImage { asset->{ url } },
      gallery[] { asset->{ url } },
      files[] { label, "url": file.asset->url },
      steps[] { label },
      "prev": *[_type == "project" && order < ^.order] | order(order desc)[0] {
        title, "slug": slug.current
      },
      "next": *[_type == "project" && order > ^.order] | order(order asc)[0] {
        title, "slug": slug.current
      }
    }`,
    { slug },
    { next: { revalidate: 0 } }
  );
}

export async function getRelatedProjects(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current != $slug] | order(order asc)[0...3] {
      _id, title, location, category,
      "slug": slug.current,
      coverImage { asset->{ url } }
    }`,
    { slug },
    { next: { revalidate: 0 } }
  );
}

export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, description, icon, categoryLabel, active, scriptText, scopeItems,
      "slug": slug.current,
      image { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getService(slug: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, title, description, icon, categoryLabel,
      "slug": slug.current,
      image { asset->{ url } }
    }`,
    { slug },
    { next: { revalidate: 0 } }
  );
}

export async function getHizmetlerPage() {
  return client.fetch(
    `*[_type == "hizmetlerPage"][0] {
      bannerTag, bannerHeading,
      bannerImage { asset->{ url } },
      ctaHeading, ctaScriptHeading, ctaButtonText, ctaButtonHref
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getHomeServicesSection() {
  return client.fetch(
    `*[_type == "homeServicesSection"][0] {
      active, tag, heading, subheading,
      bgImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getAboutContent() {
  return client.fetch(
    `*[_type == "aboutContent"][0] {
      active, tag, heading, missionTitle, description, missionPoints,
      buttonText, buttonHref,
      yearsOfExperience, projectCount, cityCount,
      awardText, googlePlaceId, googleReviewsUrl,
      mainImage { asset->{ url } },
      reviewsBgImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      siteName, tagline, phone, email, address, instagram, linkedin, pinterest, footerText
    }`
  );
}

export async function getPopupSettings() {
  return client.fetch(
    `*[_type == "popupSettings"][0] {
      active, showOnAllPages, delaySeconds, showAfterClose,
      tag, heading, subheading,
      bgImage { asset->{ url } }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getHomeStatsSection() {
  return client.fetch(
    `*[_type == "homeStatsSection"][0] {
      active, tag, heading, subheading,
      image { asset->{ url } },
      stats[] { label, value },
      ctaPretext, ctaText, ctaType, ctaLink
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

export async function getAboutPageHero() {
  return client.fetch(
    `*[_type == "aboutPageHero"][0] { active, tag, heading, headingAccent, subheading, image { asset->{ url } } }`,
    {}, { next: { revalidate: 0 } }
  );
}

export async function getAboutPageIntro() {
  return client.fetch(
    `*[_type == "aboutPageIntro"][0] {
      active, tag, heading, headingAccent, description,
      features[] { label },
      image { asset->{ url } },
      buttonText, buttonHref
    }`, {}, { next: { revalidate: 0 } }
  );
}

export async function getAboutPageServices() {
  return client.fetch(
    `*[_type == "aboutPageServices"][0] {
      active, tag, heading, headingAccent,
      bgImage { asset->{ url } },
      cards[] { icon, title, description, buttonText, buttonHref }
    }`, {}, { next: { revalidate: 0 } }
  );
}

export async function getAboutPageTimeline() {
  return client.fetch(
    `*[_type == "aboutPageTimeline"][0] {
      active, tag, heading, headingAccent,
      items[] { year, title, description }
    }`, {}, { next: { revalidate: 0 } }
  );
}

export async function getHomeStyleFinderSection() {
  return client.fetch(
    `*[_type == "homeStyleFinderSection"][0] {
      active, tag, heading, subheading,
      decorativeImage { asset->{ url } },
      cardDescription,
      features[] { label, icon },
      ctaText, ctaLink,
      tabs[] {
        title, mediaType,
        panoramaImage { asset->{ url } }, panoramaUrl,
        videoSource, videoUrl,
        image { asset->{ url } }
      }
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}
