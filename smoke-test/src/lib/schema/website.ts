import { siteConfig } from '../../config/site.config';

export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': siteConfig.schema.websiteId,
    url: `${siteConfig.brand.url}/`,
    name: siteConfig.brand.name,
    publisher: { '@id': siteConfig.schema.personId },
    inLanguage: siteConfig.brand.primaryLanguage,
  };
}
