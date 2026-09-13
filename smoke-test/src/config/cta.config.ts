import { siteConfig } from './site.config';
import type { AnalyticsEventName } from './analytics.config';

type CTA = { label: string; href: string; event: AnalyticsEventName };

export const cta: Record<string, CTA> = {
  projects: { label: 'View Projects', href: '/projects', event: 'projects_click' },
  cv: { label: 'View CV', href: '/cv', event: 'cv_view' },
  contact: { label: 'Contact Me', href: '/contact', event: 'contact_click' },
  recruiter: { label: 'Recruiters: View My Profile', href: '/cv', event: 'recruiter_cta_click' },
  linkedin: { label: 'View LinkedIn', href: siteConfig.profiles.linkedin, event: 'linkedin_click' },
  github: { label: 'View GitHub', href: siteConfig.profiles.github, event: 'github_click' },
  email: { label: 'Email Me', href: `mailto:${siteConfig.contact.email}`, event: 'email_click' },
};
