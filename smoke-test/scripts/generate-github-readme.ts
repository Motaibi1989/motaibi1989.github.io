import { mkdirSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../src/config/site.config';
import { coreExpertise } from '../src/config/expertise.config';
import { featuredProjects } from '../src/config/projects.config';

mkdirSync('generated', { recursive: true });
const projects = featuredProjects.map((p) => `- [${p.title}](${siteConfig.brand.url}${p.slug})`).join('\n');
const out = `# ${siteConfig.identity.fullName}\n\n**${siteConfig.identity.titles.primary}**\n\n${coreExpertise.map((x) => `\`${x.name}\``).join(' ')}\n\n🌐 ${siteConfig.brand.url}\n\n## Featured Projects\n${projects}\n\n## Profiles\n- LinkedIn: ${siteConfig.profiles.linkedin}\n- GitHub: ${siteConfig.profiles.github}\n`;
writeFileSync('generated/GITHUB_PROFILE_README.generated.md', out);
