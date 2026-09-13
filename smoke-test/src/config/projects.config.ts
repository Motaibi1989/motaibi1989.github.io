import { z } from 'astro/zod';

const ProjectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  slug: z.string().startsWith('/projects/'),
  summary: z.string().min(20),
  technologies: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'planned', 'verify']),
  content: z.string().optional().describe('Content collection entry slug'),
  repository: z.url().optional(),
  evidence: z.array(z.enum(['live-site', 'cv-json', 'github', 'user-plan'])).default([]),
});

export const projects = z.array(ProjectSchema).parse([
  {
    id: 'nginx-reverse-proxy', title: 'Nginx Reverse Proxy', slug: '/projects/nginx-reverse-proxy',
    summary: 'Enterprise reverse-proxy configuration covering SSL/TLS, security headers, logging, migration planning and production readiness.',
    technologies: ['nginx', 'linux'], featured: true, status: 'published', content: 'nginx-reverse-proxy',
    repository: 'https://github.com/Motaibi1989/Nginx-Reverse-Proxy', evidence: ['live-site', 'github'],
  },
  {
    id: 'sftp-automation', title: 'SFTP Automation', slug: '/projects/sftp-automation',
    summary: 'Automation patterns for scheduled file transfer, validation, archiving, retries, monitoring and operational notifications.',
    technologies: ['sftp', 'linux', 'automation'], featured: true, status: 'published', content: 'sftp-automation',
    repository: 'https://github.com/Motaibi1989/ShellScript', evidence: ['live-site', 'github'],
  },
  {
    id: 'amos-aviation-integration', title: 'Enterprise & AMOS Integration', slug: '/projects/amos-aviation-integration',
    summary: 'Integration work across aviation systems using APIs, XML/JSON, middleware, managed file transfer, monitoring and production support practices.',
    technologies: ['amos-integration', 'api-integration', 'middleware', 'sftp'], featured: true, status: 'published', content: 'amos-aviation-integration', evidence: ['live-site', 'cv-json'],
  },
  {
    id: 'docker-devops', title: 'Docker & DevOps', slug: '/projects/docker-devops',
    summary: 'Containerized development and infrastructure workflows with Docker, Linux, reverse proxies, deployment automation and CI/CD concepts.',
    technologies: ['docker', 'linux'], featured: false, status: 'published', content: 'docker-devops', evidence: ['live-site'],
  },
  {
    id: 'shellscript-repository', title: 'ShellScript Repository', slug: '/projects/shellscript-repository',
    summary: 'Reusable shell scripts for Linux administration, automation, monitoring, networking and enterprise operations.',
    technologies: ['linux', 'automation'], featured: false, status: 'published', content: 'shellscript-repository',
    repository: 'https://github.com/Motaibi1989/ShellScript', evidence: ['live-site', 'github'],
  },
  {
    id: 'free-pascal-projects', title: 'Free Pascal Projects', slug: '/projects/free-pascal-projects',
    summary: 'Windows and Linux utilities developed with Free Pascal and Lazarus, including system-information and administration tooling.',
    technologies: ['free-pascal', 'linux'], featured: false, status: 'published', content: 'free-pascal-projects',
    repository: 'https://github.com/Motaibi1989/FreePascal', evidence: ['live-site', 'github'],
  },

  // Planned case studies retained from the SEO/recruiter plan.
  {
    id: 'enterprise-sftp-modernization', title: 'Enterprise SFTP Modernization', slug: '/projects/enterprise-sftp-modernization',
    summary: 'Planned sanitized case study covering enterprise SFTP modernization, Azure integration, Linux operations and production readiness.',
    technologies: ['azure-integration', 'linux', 'sftp', 'enterprise-integration'], featured: true, status: 'planned', content: 'enterprise-sftp-modernization', evidence: ['user-plan'],
  },
  {
    id: 'ibm-mq-connectivity', title: 'IBM MQ Connectivity & Integration', slug: '/projects/ibm-mq-connectivity',
    summary: 'Planned sanitized case study covering IBM MQ connectivity, enterprise messaging, Linux troubleshooting and integration support.',
    technologies: ['ibm-mq', 'linux', 'enterprise-integration'], featured: true, status: 'planned', content: 'ibm-mq-connectivity', evidence: ['user-plan'],
  },
  {
    id: 'production-readiness', title: 'Production Readiness for Enterprise Integrations', slug: '/projects/production-readiness',
    summary: 'Planned case study covering testing, cutover, rollback, monitoring, operational readiness and production support.',
    technologies: ['enterprise-integration', 'automation'], featured: false, status: 'planned', content: 'production-readiness', evidence: ['user-plan'],
  },
]);

export const publishedProjects = projects.filter((p) => p.status === 'published');
export const featuredProjects = projects.filter((p) => p.featured && p.status !== 'verify');
