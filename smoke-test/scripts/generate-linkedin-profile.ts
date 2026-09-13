import { mkdirSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../src/config/site.config';
import { coreExpertise } from '../src/config/expertise.config';

mkdirSync('generated', { recursive: true });
const headline = siteConfig.identity.titles.linkedin ?? `${siteConfig.identity.titles.primary} | ${coreExpertise.map((x) => x.name).join(' | ')}`;
const out = `# LinkedIn Reference — ${siteConfig.identity.fullName}\n\n## Headline\n${headline}\n\n## About — canonical facts\n${siteConfig.identity.fullName} is a ${siteConfig.identity.titles.primary} based in ${siteConfig.identity.location.city}, ${siteConfig.identity.location.country}.\n\nCore expertise: ${coreExpertise.map((x) => x.name).join(', ')}.\n\n## Portfolio\n${siteConfig.brand.url}\n\n## Rule\nDo not add unverified skills from the candidate registry until their status is changed to verified.\n`;
writeFileSync('generated/linkedin-profile.generated.md', out);
