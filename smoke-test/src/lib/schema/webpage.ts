import { siteConfig } from '../../config/site.config';

export function generateWebPageSchema(page: { path: string; title: string; description: string; h1: string; id: string }) {
  const url = new URL(page.path, siteConfig.brand.url).toString();
  const schema: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': siteConfig.schema.websiteId },
    author: { '@id': siteConfig.schema.personId },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };

  if (page.id === 'amos-integration') {
    schema.about = { '@type': 'Thing', name: 'AMOS Aviation Integration' };
    schema.mentions = [
      { '@type': 'SoftwareApplication', name: 'AMOS' },
      { '@type': 'Thing', name: 'Aviation IT Integration' },
    ];
    // Keep Wikidata support from V7/V8, but do not emit an unverified Q-id.
  } else {
    schema.about = { '@id': siteConfig.schema.personId };
  }

  return schema;
}
