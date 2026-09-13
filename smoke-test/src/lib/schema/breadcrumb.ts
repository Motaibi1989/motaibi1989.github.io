import { siteConfig } from '../../config/site.config';

export function generateBreadcrumbSchema(path: string, label: string) {
  const url = new URL(path, siteConfig.brand.url).toString();
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.brand.url}/` },
      ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: label, item: url }]),
    ],
  };
}
