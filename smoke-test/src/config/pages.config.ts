import { z } from 'astro/zod';
import { siteConfig } from './site.config';

const PageSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  path: z.string().startsWith('/'),
  title: z.string().min(10),
  h1: z.string().min(3),
  description: z.string().min(30),
  primaryKeyword: z.string().min(3),
  expertise: z.array(z.string()).default([]),
  status: z.enum(['published', 'planned']),
  priority: z.number().int().min(1).max(100),
});

const n = siteConfig.identity.fullName;
const t = siteConfig.identity.titles.primary;

export const pages = z.array(PageSchema).parse([
  {
    id: 'home', path: '/', status: 'published', priority: 100,
    title: `${n} | ${t} | Saudi Arabia`,
    h1: `${n} — ${t}`,
    description: 'Senior Enterprise Integration Specialist in Saudi Arabia focused on enterprise integration, IBM MQ, Azure Integration Services, Logic Apps, APIs, Linux, SFTP, middleware and aviation IT.',
    primaryKeyword: 'Enterprise Integration Specialist Saudi Arabia',
    expertise: ['enterprise-integration', 'ibm-mq', 'azure-integration', 'linux', 'sftp', 'amos-integration'],
  },
  {
    id: 'enterprise-integration', path: '/enterprise-integration', status: 'published', priority: 95,
    title: `Enterprise Integration Specialist Saudi Arabia | ${n}`,
    h1: `Enterprise Integration Specialist — ${n}`,
    description: 'Enterprise integration experience covering middleware, APIs, IBM MQ, Azure Integration Services, secure file transfer, Linux automation and production operations.',
    primaryKeyword: 'Enterprise Integration Specialist Saudi Arabia',
    expertise: ['enterprise-integration', 'ibm-mq', 'middleware', 'api-integration', 'sftp'],
  },
  {
    id: 'ibm-mq', path: '/ibm-mq', status: 'published', priority: 94,
    title: `IBM MQ Specialist Saudi Arabia | ${n}`,
    h1: `IBM MQ Integration Specialist — ${n}`,
    description: 'IBM MQ integration and connectivity experience including queues, channels, enterprise messaging, production support and troubleshooting.',
    primaryKeyword: 'IBM MQ Specialist Saudi Arabia',
    expertise: ['ibm-mq', 'enterprise-integration', 'linux'],
  },
  {
    id: 'amos-integration', path: '/amos-integration', status: 'published', priority: 93,
    title: `AMOS Aviation Integration Specialist | ${n}`,
    h1: 'AMOS & Aviation Integration Specialist',
    description: 'AMOS and aviation IT integration experience covering enterprise interfaces, APIs, XML/JSON, middleware, secure file transfer, monitoring and production support.',
    primaryKeyword: 'AMOS Integration Specialist',
    expertise: ['amos-integration', 'enterprise-integration', 'api-integration', 'middleware', 'sftp'],
  },
  {
    id: 'azure-integration', path: '/azure-integration', status: 'published', priority: 92,
    title: `Azure Integration Services Specialist | ${n}`,
    h1: 'Azure Integration Services Specialist',
    description: 'Azure Integration Services experience covering Logic Apps, APIs, secure file transfer, workflows and enterprise integration architectures.',
    primaryKeyword: 'Azure Integration Services Specialist Saudi Arabia',
    expertise: ['azure-integration', 'azure-logic-apps', 'api-integration', 'sftp'],
  },
  {
    id: 'projects', path: '/projects', status: 'published', priority: 90,
    title: `Enterprise Integration Projects | ${n}`,
    h1: 'Enterprise Integration Projects',
    description: 'Selected enterprise integration, Linux automation, SFTP, IBM MQ, aviation integration and infrastructure projects by Mohammed Alotaibi.',
    primaryKeyword: 'Enterprise Integration Projects', expertise: [],
  },
  {
    id: 'experience', path: '/experience', status: 'published', priority: 85,
    title: `Professional Experience | ${n}`,
    h1: 'Professional Experience',
    description: 'Professional experience across enterprise integration, AMOS aviation systems, infrastructure, automation, Linux and production operations.',
    primaryKeyword: 'Mohammed Alotaibi Experience', expertise: [],
  },
  {
    id: 'cv', path: '/cv', status: 'published', priority: 85,
    title: `${n} CV | Enterprise Integration Specialist`,
    h1: `${n} — CV`,
    description: 'Recruiter-friendly professional CV for Mohammed Alotaibi, Senior Enterprise Integration Specialist in Saudi Arabia.',
    primaryKeyword: 'Mohammed Alotaibi CV', expertise: [],
  },
  {
    id: 'contact', path: '/contact', status: 'published', priority: 80,
    title: `Contact ${n}`,
    h1: `Contact ${n}`,
    description: 'Contact Mohammed Alotaibi for professional networking, enterprise integration discussions and relevant career opportunities.',
    primaryKeyword: 'Contact Mohammed Alotaibi', expertise: [],
  },

  // Preserve Hub & Spoke pages from earlier plans, but keep them planned until enough unique content exists.
  { id: 'middleware', path: '/middleware', status: 'planned', priority: 50, title: `Middleware Integration | ${n}`, h1: 'Middleware Integration', description: 'Planned focused page for middleware integration experience and related case studies.', primaryKeyword: 'Middleware Specialist Saudi Arabia', expertise: ['middleware'] },
  { id: 'api-integration', path: '/api-integration', status: 'planned', priority: 50, title: `API Integration Specialist | ${n}`, h1: 'API Integration Specialist', description: 'Planned focused page for API integration experience and related enterprise integration projects.', primaryKeyword: 'API Integration Specialist Saudi Arabia', expertise: ['api-integration'] },
  { id: 'linux-automation', path: '/linux-automation', status: 'planned', priority: 45, title: `Linux Automation | ${n}`, h1: 'Linux Automation', description: 'Planned page covering Linux administration, monitoring, Bash automation and enterprise operations.', primaryKeyword: 'Linux Automation Specialist', expertise: ['linux', 'automation'] },
  { id: 'sftp-integration', path: '/sftp-integration', status: 'planned', priority: 45, title: `SFTP Integration | ${n}`, h1: 'SFTP Integration', description: 'Planned focused page for secure file transfer architecture, automation, monitoring and enterprise integration.', primaryKeyword: 'SFTP Integration Specialist', expertise: ['sftp', 'enterprise-integration'] },
]);

export const publishedPages = pages.filter((page) => page.status === 'published');
export const pageById = Object.fromEntries(pages.map((page) => [page.id, page]));
