import { z } from 'astro/zod';

const notFutureIsoDate = z.iso.date().refine(
  (value) => new Date(`${value}T00:00:00Z`).getTime() <= Date.now(),
  { message: 'Date cannot be in the future' },
);

export const SiteConfigSchema = z.object({
  identity: z.object({
    fullName: z.string().min(2),
    preferredName: z.string().min(2),
    username: z.string().min(2),
    titles: z.object({
      primary: z.string().min(3),
      short: z.string().min(3),
      linkedin: z.string().min(3).optional(),
      seo: z.string().min(3).optional(),
    }),
    careerStartDate: notFutureIsoDate.nullable(),
    careerStartYear: z.number().int().min(1980).max(new Date().getUTCFullYear()),
    careerStartPrecision: z.enum(['exact', 'year']),
    birthDate: notFutureIsoDate.nullable(),
    location: z.object({
      city: z.string(),
      region: z.string().optional(),
      country: z.string(),
      countryCode: z.string().length(2),
      timezone: z.string(),
    }),
  }),
  brand: z.object({
    name: z.string(),
    domain: z.string(),
    url: z.url(),
    primaryLanguage: z.string(),
    secondaryLanguage: z.string().optional(),
  }),
  contact: z.object({
    email: z.email(),
    phone: z.string().nullable(),
    exposePhonePublicly: z.boolean().default(false),
  }),
  profiles: z.object({
    linkedin: z.url(),
    github: z.url(),
    stackoverflow: z.url().optional(),
  }),
  schema: z.object({
    personId: z.url(),
    websiteId: z.url(),
    occupationalCategory: z.object({
      taxonomy: z.string(),
      code: z.string().nullable(),
      label: z.string().nullable(),
      status: z.enum(['verified', 'candidate', 'disabled']),
      note: z.string().optional(),
    }),
  }),
  cv: z.object({
    filename: z.string(),
    pageUrl: z.string(),
  }),
  dynamic: z.object({
    yearsOfExperience: z.literal('computed'),
    age: z.literal('computed'),
    projectCount: z.literal('computed'),
    expertiseCount: z.literal('computed'),
    certificationCount: z.literal('computed'),
    articleCount: z.literal('computed'),
    lastUpdated: z.literal('computed'),
  }),
});

const rawSiteConfig = {
  identity: {
    fullName: 'Mohammed Alotaibi',
    preferredName: 'Mohammed',
    username: 'Motaibi1989',
    titles: {
      primary: 'Senior Enterprise Integration Specialist',
      short: 'Enterprise Integration Specialist',
      linkedin: 'Senior Enterprise Integration Specialist | IBM MQ | Azure Integration Services | Linux | SFTP | Aviation IT',
      seo: 'Enterprise Integration Specialist',
    },
    // The live site verifies the career timeline starts in 2013, but not the exact day/month.
    // Keep the exact date null until verified instead of inventing 2013-01-01.
    careerStartDate: null,
    careerStartYear: 2013,
    careerStartPrecision: 'year',
    // Preserved as a computed capability from V7/V8. Not shown publicly by default.
    birthDate: null,
    location: {
      city: 'Jeddah',
      region: 'Makkah Province',
      country: 'Saudi Arabia',
      countryCode: 'SA',
      timezone: 'Asia/Riyadh',
    },
  },
  brand: {
    name: 'Mohammed Alotaibi',
    domain: 'motaibi1989.com',
    url: 'https://motaibi1989.com',
    primaryLanguage: 'en',
    secondaryLanguage: 'ar',
  },
  contact: {
    email: 'motaibi1989@gmail.com',
    // A phone appears in an older profile data file, but it is intentionally not copied
    // into the public canonical config until Mohammed explicitly verifies/publicizes it.
    phone: null,
    exposePhonePublicly: false,
  },
  profiles: {
    linkedin: 'https://www.linkedin.com/in/motaibi1989',
    github: 'https://github.com/Motaibi1989',
    stackoverflow: 'https://stackoverflow.com/users/3082739/motaibi1989',
  },
  schema: {
    personId: 'https://motaibi1989.com/#person',
    websiteId: 'https://motaibi1989.com/#website',
    // Keep occupationalCategory as requested, but do not deploy a misleading code.
    // ISCO-08 2523 (Computer Network Professionals) remains a candidate only, not enabled.
    occupationalCategory: {
      taxonomy: 'ISCO-08',
      code: '2523',
      label: 'Computer Network Professionals',
      status: 'candidate',
      note: 'Candidate only; Enterprise Integration Specialist is not an exact match. Do not emit until manually approved.',
    },
  },
  cv: {
    filename: 'Mohammed-Alotaibi-Enterprise-Integration-CV.pdf',
    pageUrl: '/cv',
  },
  dynamic: {
    yearsOfExperience: 'computed',
    age: 'computed',
    projectCount: 'computed',
    expertiseCount: 'computed',
    certificationCount: 'computed',
    articleCount: 'computed',
    lastUpdated: 'computed',
  },
} as const;

export const siteConfig = SiteConfigSchema.parse(rawSiteConfig);
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
