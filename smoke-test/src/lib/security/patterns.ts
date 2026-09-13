export const forbiddenPatterns: Array<{ name: string; regex: RegExp; severity: 'error' | 'warning' }> = [
  // IPs are warnings because public IPs can be legitimate. Private ranges are errors below.
  { name: 'Private IPv4 10/8', regex: /\b10(?:\.\d{1,3}){3}\b/g, severity: 'error' },
  { name: 'Private IPv4 172.16/12', regex: /\b172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}\b/g, severity: 'error' },
  { name: 'Private IPv4 192.168/16', regex: /\b192\.168(?:\.\d{1,3}){2}\b/g, severity: 'error' },
  { name: 'Internal domain', regex: /\b[\w.-]+\.internal\b/gi, severity: 'error' },
  { name: 'Local domain', regex: /\b[\w.-]+\.local\b/gi, severity: 'warning' },
  { name: 'Likely secret assignment', regex: /\b(password|secret|token|api[_-]?key)\s*[:=]\s*[^\s"']+/gi, severity: 'error' },
];

// Important: patterns such as /[A-Z]{2,}-\\d{4,}/ are intentionally NOT blanket-blocked;
// they create false positives for public change/incident IDs. Company-specific rules can be added later.
