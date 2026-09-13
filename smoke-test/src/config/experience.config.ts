import { z } from 'astro/zod';

const ExperienceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  organization: z.string(),
  title: z.string(),
  startDate: z.iso.date().nullable(),
  endDate: z.iso.date().nullable(),
  startYear: z.number().int(),
  endYear: z.number().int().nullable(),
  precision: z.enum(['exact', 'year']),
  current: z.boolean(),
  summary: z.string(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  source: z.enum(['live-site', 'cv-json', 'user-verified']),
});

// The public site currently exposes year-level dates only. Exact ISO dates stay null until verified.
export const experience = z.array(ExperienceSchema).parse([
  {
    id: 'senior-enterprise-integration-specialist', organization: 'Saudia Technic', title: 'Senior Enterprise Integration Specialist',
    startDate: null, endDate: null, startYear: 2022, endYear: null, precision: 'year', current: true,
    summary: 'Enterprise integration, Azure Integration Services, APIs, SFTP, production readiness, monitoring, troubleshooting and automation.',
    achievements: [], technologies: ['enterprise-integration', 'azure-integration', 'api-integration', 'sftp', 'linux', 'automation'], source: 'live-site',
  },
  {
    id: 'amos-admin-integration-specialist', organization: 'SAEI', title: 'AMOS Admin / Integration Specialist',
    startDate: null, endDate: null, startYear: 2018, endYear: 2022, precision: 'year', current: false,
    summary: 'AMOS administration and integration work across XML, middleware, automation, enterprise interfaces and aviation business systems.',
    achievements: [], technologies: ['amos-integration', 'middleware', 'automation', 'enterprise-integration'], source: 'live-site',
  },
  {
    id: 'data-integration-systems-specialist', organization: 'SAEI', title: 'Data Integration / Systems Specialist',
    startDate: null, endDate: null, startYear: 2014, endYear: 2018, precision: 'year', current: false,
    summary: 'Linux and Windows infrastructure, integrations, scripting, reverse proxy, virtualization, monitoring and operational support.',
    achievements: [], technologies: ['linux', 'enterprise-integration', 'nginx', 'automation'], source: 'live-site',
  },
  {
    id: 'junior-systems-administrator', organization: 'SAEI', title: 'Junior Systems Administrator',
    startDate: null, endDate: null, startYear: 2013, endYear: 2014, precision: 'year', current: false,
    summary: 'User administration, scheduled jobs, endpoint support, technical systems and operational documentation.',
    achievements: [], technologies: ['linux', 'automation'], source: 'live-site',
  },
]);
