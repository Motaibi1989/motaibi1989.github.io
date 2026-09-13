import { siteConfig } from '../src/config/site.config';

const urls = [siteConfig.profiles.linkedin, siteConfig.profiles.github, siteConfig.profiles.stackoverflow].filter(Boolean) as string[];
let failed = 0;
for (const url of urls) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
    if (response.ok || [401, 403, 405, 429].includes(response.status)) {
      console.log(`OK/WARN ${response.status}: ${url}`);
    } else {
      console.warn(`WARN ${response.status}: ${url}`); failed += 1;
    }
  } catch (error) {
    console.warn(`WARN network: ${url} — ${String(error)}`); failed += 1;
  }
}
// Intentionally non-blocking: external anti-bot/rate-limit behavior must not break production builds.
if (failed) console.warn(`${failed} external link checks need review.`);
