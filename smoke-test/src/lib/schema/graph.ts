import { generatePersonSchema } from './person';
import { generateWebSiteSchema } from './website';
import { generateWebPageSchema } from './webpage';
import { generateBreadcrumbSchema } from './breadcrumb';

export function generateSchemaGraph(page: { path: string; title: string; description: string; h1: string; id: string }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generatePersonSchema(),
      generateWebSiteSchema(),
      generateWebPageSchema(page),
      generateBreadcrumbSchema(page.path, page.h1),
    ],
  };
}
