import { mkdirSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../src/config/site.config';
import { enabledExpertise } from '../src/config/expertise.config';
import { publishedProjects } from '../src/config/projects.config';
import { getStats } from '../src/lib/derived/stats';

mkdirSync('public/data', { recursive: true });
const profile = {
  generated: true,
  name: siteConfig.identity.fullName,
  title: siteConfig.identity.titles.primary,
  location: `${siteConfig.identity.location.city}, ${siteConfig.identity.location.country}`,
  website: siteConfig.brand.url,
  linkedin: siteConfig.profiles.linkedin,
  github: siteConfig.profiles.github,
  expertise: enabledExpertise.map((x) => x.name),
  stats: getStats(),
  projects: publishedProjects.map(({ id, title, slug, technologies }) => ({ id, title, slug, technologies })),
};
writeFileSync('public/data/profile.json', `${JSON.stringify(profile, null, 2)}\n`);
