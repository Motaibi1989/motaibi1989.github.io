# V8 Implementation Notes

## Architecture

```text
Canonical Source (TypeScript + Zod)
           │
           ├── site.config.ts
           ├── expertise.config.ts
           ├── pages.config.ts
           ├── projects.config.ts
           ├── experience.config.ts
           └── certifications.config.ts
           │
           ▼
    Zod Validation Layer
           │
           ▼
    Derived Data
    ├── getYearsOfExperience()
    ├── getProjectCount()
    └── getExpertiseCount()
           │
           ▼
    ┌──────┼──────┬──────┬──────┐
    ▼      ▼      ▼      ▼      ▼
 Website  JSON-LD  CV   GitHub  JSON API
```

## Preserved V3–V8 requirements

- LinkedIn = primary discovery channel; website = proof/authority/conversion.
- P0 Foundation: metadata, Schema, canonical, robots, sitemap, Search Console/Bing/IndexNow integration plan, CWV/mobile/accessibility.
- P1 pages: Enterprise Integration, IBM MQ, AMOS/Aviation, Azure Integration first.
- Planned Hub/Spoke pages for Middleware, API Integration, Linux Automation and SFTP Integration are preserved.
- P2 proof: case studies, diagrams, impact evidence, ATS-safe CV and certifications engine.
- P3 distribution: LinkedIn, GitHub, Bayt, GulfTalent, Naukrigulf reference exports.
- P4 authority: IBM MQ, Azure, Linux, production-readiness and AMOS/Aviation articles.
- P5 measurement: impressions, queries, clicks, CV events, contact events and recruiter outcomes.
- `llms.txt` is preserved as experimental low-priority output.
- `age` is preserved as a computed capability but hidden by default.
- `occupationalCategory` is preserved as a candidate field but not emitted until verified.
- `alumniOf` capability is preserved conceptually for educational/alumni relationships, not job history.
- AMOS `about`, `mentions` and future verified Wikidata support are preserved.
- External HEAD checking is preserved as a scheduled, non-blocking check.
- Schema libraries remain optional; local typed generators are implemented first.

## Zod date handling

`careerStartDate` supports `z.iso.date().refine(...)`. The current public data only verifies the year 2013, so the exact date remains null rather than inventing a day/month.

## Astro version requirement

This test architecture targets Astro 6+, which requires Node 22.12+ and uses `astro/zod`.

## PDF CV

The PDF renderer is intentionally not locked to a package yet. The canonical data layer is ready for `pretext-pdf`, WeasyPrint-based rendering, Puppeteer, or another renderer after evaluating output quality and maintenance. The web CV already consumes the same canonical data.
