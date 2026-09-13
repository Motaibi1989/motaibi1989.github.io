import { z } from 'astro/zod';

export const CertificationSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  issuer: z.string(),
  issueDate: z.iso.date().nullable(),
  credentialUrl: z.url().nullable(),
  status: z.enum(['verified', 'verify']),
  visible: z.boolean(),
});

// The live home page does not currently expose named certifications.
// Keep the engine ready, but do not invent credentials.
export const certifications = z.array(CertificationSchema).parse([]);
