# WebTest — Motaibi1989 Portfolio Data / Entity Engine

This folder is a **safe test implementation** for migrating `motaibi1989.com` from a static HTML portfolio into a config-driven Portfolio + Entity Engine.

## What was verified before creating this folder

The live site and GitHub repository were checked first. The current public site identifies Mohammed Alotaibi as **Senior Enterprise Integration Specialist** in **Jeddah, Saudi Arabia**, and publicly presents Enterprise Integration, Azure Integration Services, Logic Apps, APIs, SFTP, Linux, AMOS, Nginx, Docker and Free Pascal. The existing repository is currently static HTML, not Astro.

See `docs/DATA_AUDIT.md` for inconsistencies and verification status.

## Core rule

> Store facts once. Validate them once. Derive everything else.

## Start

Astro 6+ requires Node 22.12+.

```bash
nvm use
npm install
npm run validate
npm run generate
npm run dev
```

Build:

```bash
npm run build
```

Optional scheduled external link check:

```bash
npm run check:external
```

## Key folders

```text
src/config/        canonical facts and registries
src/content/       long-form project/article content
src/lib/derived/   computed values
src/lib/schema/    generated JSON-LD logic only
scripts/           validation and output generators
public/data/       generated machine-readable profile
generated/         LinkedIn/GitHub reference outputs
docs/              audit and migration notes
```

## Important safety rule

Candidate skills are **not deleted**, but remain `status: verify` + `enabled: false` until confirmed. This preserves IIB/ACE/WAS/MuleSoft/TIBCO/Boomi and other earlier ideas without publishing claims that have not been verified.
