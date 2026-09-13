export const analyticsEvents = {
  // Discovery
  page_view: { category: 'discovery', label: 'Page View' },
  project_view: { category: 'discovery', label: 'Project View' },

  // Consideration
  cv_view: { category: 'consideration', label: 'CV View' },
  cv_download: { category: 'consideration', label: 'CV Download' },

  // Conversion
  contact_click: { category: 'conversion', label: 'Contact Click' },
  linkedin_click: { category: 'conversion', label: 'LinkedIn Click' },
  github_click: { category: 'conversion', label: 'GitHub Click' },

  // Recruiter-specific
  recruiter_cta_click: { category: 'recruiter', label: 'Recruiter CTA Click' },
  email_click: { category: 'recruiter', label: 'Email Click' },

  // Navigation/engagement
  projects_click: { category: 'engagement', label: 'Projects Click' },
  article_view: { category: 'engagement', label: 'Article View' },
} as const;

export type AnalyticsEventName = keyof typeof analyticsEvents;
