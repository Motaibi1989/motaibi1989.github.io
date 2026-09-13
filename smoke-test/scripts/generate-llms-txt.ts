import { mkdirSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../src/config/site.config';
import { coreExpertise } from '../src/config/expertise.config';

mkdirSync('public', { recursive: true });
const out = `# ${siteConfig.identity.fullName}\n> ${siteConfig.identity.titles.short} — ${siteConfig.identity.location.country}\n\n## Expertise\n${coreExpertise.map((x) => `- ${x.name}`).join('\n')}\n\n## Links\n- ${siteConfig.brand.url}/cv\n- ${siteConfig.brand.url}/projects\n- ${siteConfig.brand.url}/ibm-mq\n- ${siteConfig.brand.url}/azure-integration\n- ${siteConfig.brand.url}/amos-integration\n\n# Status\nExperimental convenience file. It is not treated as a Google Search ranking requirement.\n`;
writeFileSync('public/llms.txt', out);
