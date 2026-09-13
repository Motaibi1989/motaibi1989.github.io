import { siteConfig } from '../src/config/site.config';
import { expertise } from '../src/config/expertise.config';
import { pages } from '../src/config/pages.config';
import { projects } from '../src/config/projects.config';
import { analyticsEvents } from '../src/config/analytics.config';
import { forbiddenPatterns } from '../src/lib/security/patterns';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const errors: string[] = [];
const warnings: string[] = [];

function unique(values: string[], label: string) {
  const dupes = values.filter((v, i) => values.indexOf(v) !== i);
  if (dupes.length) errors.push(`${label} duplicates: ${[...new Set(dupes)].join(', ')}`);
}

unique(expertise.map((x) => x.id), 'Expertise ID');
unique(pages.map((x) => x.id), 'Page ID');
unique(pages.map((x) => x.path), 'Page path');
unique(projects.map((x) => x.id), 'Project ID');
unique(Object.keys(analyticsEvents), 'Analytics event');

const expertiseIds = new Set(expertise.map((x) => x.id));
for (const page of pages) {
  for (const skill of page.expertise) if (!expertiseIds.has(skill)) errors.push(`Page ${page.id} references unknown expertise: ${skill}`);
}
for (const project of projects) {
  for (const skill of project.technologies) if (!expertiseIds.has(skill)) errors.push(`Project ${project.id} references unknown expertise: ${skill}`);
}

if (siteConfig.schema.personId !== `${siteConfig.brand.url}/#person`) errors.push('Person @id must be canonical site URL + /#person');
if (siteConfig.schema.websiteId !== `${siteConfig.brand.url}/#website`) errors.push('WebSite @id must be canonical site URL + /#website');
if (siteConfig.schema.occupationalCategory.status !== 'verified') warnings.push('occupationalCategory is preserved but not emitted until verified.');
if (siteConfig.identity.careerStartDate === null) warnings.push('Exact careerStartDate not verified; year-level dynamic calculation is active.');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name); const st = statSync(p);
    return st.isDirectory() ? walk(p) : [p];
  });
}

for (const file of walk('src').filter((f) => /\.(ts|astro|md|json)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const rule of forbiddenPatterns) {
    rule.regex.lastIndex = 0;
    if (rule.regex.test(text)) {
      const msg = `${rule.name} detected in ${relative('.', file)}`;
      (rule.severity === 'error' ? errors : warnings).push(msg);
    }
  }
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}
console.log(`Validation passed: ${pages.length} pages, ${projects.length} projects, ${expertise.length} expertise entries.`);
