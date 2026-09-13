import { z } from 'astro/zod';

export const ExpertiseSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  aliases: z.array(z.string()).default([]),
  core: z.boolean().default(false),
  category: z.enum(['integration', 'cloud', 'os', 'protocol', 'domain', 'automation', 'devops', 'monitoring', 'development']),
  status: z.enum(['verified', 'verify', 'planned']),
  enabled: z.boolean(),
  evidence: z.array(z.enum(['live-site', 'cv-json', 'github', 'user-plan'])).default([]),
  notes: z.string().optional(),
});

export const ExpertiseConfigSchema = z.array(ExpertiseSchema);

export const expertise = ExpertiseConfigSchema.parse([
  { id: 'enterprise-integration', name: 'Enterprise Integration', core: true, category: 'integration', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'ibm-mq', name: 'IBM MQ', aliases: ['WebSphere MQ'], core: true, category: 'integration', status: 'verified', enabled: true, evidence: ['cv-json', 'user-plan'] },
  { id: 'azure-integration', name: 'Azure Integration Services', core: true, category: 'cloud', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'azure-logic-apps', name: 'Azure Logic Apps', category: 'cloud', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'api-integration', name: 'API Integration', aliases: ['APIs'], category: 'integration', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'linux', name: 'Linux', category: 'os', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json', 'github'] },
  { id: 'sftp', name: 'SFTP', category: 'protocol', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json', 'github'] },
  { id: 'middleware', name: 'Middleware', category: 'integration', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'amos-integration', name: 'AMOS Aviation Integration', aliases: ['AMOS', 'Aviation IT Integration'], core: true, category: 'domain', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'automation', name: 'Automation', category: 'automation', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'nginx', name: 'Nginx', category: 'devops', status: 'verified', enabled: true, evidence: ['live-site', 'github'] },
  { id: 'docker', name: 'Docker', category: 'devops', status: 'verified', enabled: true, evidence: ['live-site', 'cv-json'] },
  { id: 'free-pascal', name: 'Free Pascal', aliases: ['Lazarus'], category: 'development', status: 'verified', enabled: true, evidence: ['live-site', 'github'] },

  // Preserved candidate keywords from V3-V8. They are NOT emitted to public Schema/SEO until verified.
  { id: 'ibm-iib', name: 'IBM Integration Bus', aliases: ['IIB'], category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'], notes: 'Enable only after verifying hands-on experience.' },
  { id: 'ibm-ace', name: 'IBM App Connect Enterprise', aliases: ['ACE'], category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'], notes: 'Enable only after verifying hands-on experience.' },
  { id: 'websphere-was', name: 'WebSphere Application Server', aliases: ['WAS'], category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'], notes: 'Do not confuse WebSphere MQ historical naming with WAS administration.' },
  { id: 'eai', name: 'Enterprise Application Integration', aliases: ['EAI'], category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'ipaas', name: 'Integration Platform as a Service', aliases: ['iPaaS'], category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'mulesoft', name: 'MuleSoft', category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'tibco', name: 'TIBCO', category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'boomi', name: 'Boomi', category: 'integration', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', status: 'verify', enabled: false, evidence: ['cv-json', 'user-plan'] },
  { id: 'cicd', name: 'CI/CD', category: 'devops', status: 'verify', enabled: false, evidence: ['live-site', 'user-plan'] },
  { id: 'grafana', name: 'Grafana', category: 'monitoring', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'elk', name: 'ELK Stack', category: 'monitoring', status: 'verify', enabled: false, evidence: ['user-plan'] },
  { id: 'prometheus', name: 'Prometheus', category: 'monitoring', status: 'verify', enabled: false, evidence: ['cv-json', 'user-plan'] },
]);

export const enabledExpertise = expertise.filter((item) => item.enabled && item.status === 'verified');
export const coreExpertise = enabledExpertise.filter((item) => item.core);
