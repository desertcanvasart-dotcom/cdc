# Clinique du Caire

A bilingual clinic website and a first-phase marketing workspace, built with HTML, CSS and JavaScript. No package installation or build is needed.

## Run locally

Requires Node.js 18 or later.

```sh
npm start
```

- Website: http://127.0.0.1:4173/
- Marketing Studio: http://127.0.0.1:4173/studio/
- Syntax checks: `npm run check`

The preview server binds to localhost. Set `PORT` to choose another port.

## Website

English and Arabic layouts; treatment filtering; doctor search and profiles; branch-specific contacts and directions; insurance information; FAQs; and a guided visit planner. Booking prepares a WhatsApp message for the visitor to review and send. It does not reserve appointments or write to a booking database.

The reception guide provides predefined clinic information rather than live AI chat. Doctor portraits and full biographies remain to be supplied. The homepage uses labeled illustrative imagery rather than an authentic clinic photograph.

## Marketing Studio

- Twelve AI-authored bilingual starter campaign drafts, with proposed dates beginning 15 October 2026.
- Editable captions, headlines, platform, planned date/time and creative direction.
- Content calendar and local approval queue.
- Review checks, notes and decision history; edits reset approval.
- 1080 × 1080 PNG exports, caption CSVs, JSON backups and approved calendar tasks.
- Campaign links point to the existing clinic website, with UTM parameters.

New drafts use templates. Live AI generation, shared storage, automated scheduling, social publishing and performance analytics are **not implemented**. Planned dates do not schedule external posts, and approval does not publish content.

Drafts and review records are saved in browser localStorage. They are not shared across devices or reviewers. Imported backups require fresh review. Export a backup before moving between origins or devices.

## Next implementation phase

1. Add a server-side AI service using securely configured runtime credentials.
2. Add authenticated shared storage and reviewer roles.
3. Connect the clinic's Facebook and Instagram accounts through a supported publishing provider, such as Metricool.
4. Implement publication with provider receipts, duplicate prevention, error recovery and audit records.
5. Add reporting from real provider analytics.

Publishing must verify the intended clinic account. Never mark a post published without a successful provider response and a post identifier. Clinical wording requires qualified review; patient imagery requires permission. Do not invent credentials, testimonials, prices or treatment outcomes.

## Files

- `index.html`, `style.css`, `app.js`: patient-facing website.
- `studio/`: marketing workspace, starter content and interactions.
- `assets/campaign-care.png`: AI-generated illustrative brand artwork, not a clinic photograph.
- `tools/serve.mjs`: dependency-free local preview server.

## Deployment and access

Serve the repository root with any static host. Keep `/studio/` behind appropriate authentication when deploying publicly; its `noindex` metadata is not access control. The current Sites deployment is owner-private. Its hosting identity and credentials are intentionally excluded from this public repository.

The current app uses hash-based routes. Search-indexable treatment URLs and a production backend remain part of the next implementation phase. Fonts load from Google Fonts and the website's illustrative photo loads from Unsplash.

## Content sources

Clinic information was reviewed from https://cliniqueducaire.com/en and its linked services, doctors, branches, insurance, FAQ, contact and booking pages on 14 October 2026. Verify operational information with the clinic before launch. The starter content is a draft campaign, not an approved or published campaign.
