# Data Audit — WebTest

## Sources checked

1. Live site: `https://motaibi1989.com/`
2. GitHub repository: `Motaibi1989/motaibi1989.github.io`
3. Existing CV data: `cv/profile.json` and `cv/Enhanced_profile.json`
4. Existing public CV/home HTML in the repository

## Verified from the live site

| Field | Verified value | Status |
|---|---|---|
| Name | Mohammed Alotaibi | verified |
| Primary title | Senior Enterprise Integration Specialist | verified |
| City | Jeddah | verified |
| Country | Saudi Arabia | verified |
| Website | https://motaibi1989.com | verified |
| GitHub | https://github.com/Motaibi1989 | verified |
| LinkedIn | https://www.linkedin.com/in/motaibi1989 | verified |
| Stack Overflow | https://stackoverflow.com/users/3082739/motaibi1989 | verified |
| Public email | motaibi1989@gmail.com | verified |
| Enterprise Integration | present on live site | verified |
| Azure Integration Services | present on live site | verified |
| Logic Apps | present on live site | verified |
| APIs | present on live site | verified |
| SFTP | present on live site | verified |
| Linux | present on live site | verified |
| AMOS | present on live site | verified |
| Nginx | present on live site | verified |
| Docker | present on live site | verified |
| Free Pascal | present on live site | verified |

## Important inconsistencies / items requiring verification

| Item | Existing data | WebTest decision |
|---|---|---|
| Years of experience | Live site says `10+`; Enhanced profile says `13`; live timeline starts in 2013 | derive dynamically from verified start year; exact date stays null |
| Career start date | Timeline provides year 2013, not day/month | `careerStartYear=2013`, `careerStartDate=null`, precision=`year` |
| Phone | Appears in an existing CV JSON but not on live home page | not copied into public canonical config until explicitly verified/publicized |
| AWS/GCP/Kubernetes/Terraform/etc. | Some appear in Enhanced profile but not current home page | do not promote automatically; keep verification workflow |
| IIB/ACE/WAS/MuleSoft/TIBCO/Boomi | Included in planning discussions as possible recruiter keywords | preserved as disabled `verify` entries; never emitted until verified |
| occupationalCategory | ISCO-08 2523 is only a rough candidate, not an exact Enterprise Integration match | preserve candidate but do not emit Schema until verified |
| AMOS Wikidata | no verified Q-id yet | support preserved, external entity disabled until exact match found |

## Current live career timeline used in WebTest

- 2022–Present — Senior Enterprise Integration Specialist — Saudia Technic
- 2018–2022 — AMOS Admin / Integration Specialist — SAEI
- 2014–2018 — Data Integration / Systems Specialist — SAEI
- 2013–2014 — Junior Systems Administrator — SAEI

Exact month/day values are intentionally not invented.

## Rules

- Facts are stored once.
- Unverified technologies remain in the registry with `status: verify` and `enabled: false`.
- No private IP, internal hostname, secret, or confidential architecture is allowed in public case studies.
- Public Schema is generated only from enabled + verified expertise.
