import { siteConfig } from '../../config/site.config';
import { enabledExpertise } from '../../config/expertise.config';

export function generatePersonSchema() {
  const occupation: Record<string, unknown> = {
    '@type': 'Occupation',
    name: siteConfig.identity.titles.short,
    skills: enabledExpertise.map((x) => x.name).join(', '),
  };

  const category = siteConfig.schema.occupationalCategory;
  // Preserve occupationalCategory, but emit it only when explicitly verified.
  if (category.status === 'verified' && category.code && category.label) {
    occupation.occupationalCategory = {
      '@type': 'CategoryCode',
      codeValue: category.code,
      name: category.label,
      inCodeSet: category.taxonomy,
    };
  }

  return {
    '@type': 'Person',
    '@id': siteConfig.schema.personId,
    name: siteConfig.identity.fullName,
    url: `${siteConfig.brand.url}/`,
    jobTitle: siteConfig.identity.titles.primary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.identity.location.city,
      addressRegion: siteConfig.identity.location.region,
      addressCountry: siteConfig.identity.location.countryCode,
    },
    hasOccupation: occupation,
    knowsAbout: enabledExpertise.map((x) => x.name),
    sameAs: [
      siteConfig.profiles.linkedin,
      siteConfig.profiles.github,
      siteConfig.profiles.stackoverflow,
    ].filter(Boolean),
  };
}
