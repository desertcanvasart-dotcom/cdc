# Clinique du Caire

Bilingual clinic website and a shared marketing workspace built with Vinext, Cloudflare D1 and R2. Social accounts can be linked later; no publishing integration is enabled in this version.

## What works

- Existing English/Arabic website, treatment and doctor discovery, unit-specific directions, FAQs and WhatsApp visit planning.
- Shared drafts, calendar preferences, audit history and optimistic concurrency checks.
- Owner, editor and reviewer roles enforced by the API.
- Signed-in review decisions, required clinical/factual/artwork checks and approval reset after edits.
- Server-side OpenAI text and image generation endpoints, strict draft output validation, recorded generation jobs, duplicate-request protection and daily per-user limits.
- Generated artwork stored in R2 and served only to workspace members.
- Caption and PNG exports, backups and browser-draft imports. Imports create new drafts and require review.

**Live AI generation requires a configured `OPENAI_API_KEY`.** Without it, the workspace explicitly disables live generation while template drafts and reviews remain available. Tests use isolated storage and mocked provider responses; they do not prove live model access or billing readiness.

**Social publishing, social scheduling and performance analytics remain deferred.** Planned dates and calendar exports do not schedule posts. Booking still prepares a WhatsApp request and does not reserve an appointment.

## Local setup

Requires Node.js 24 (minimum supported runtime is Node.js 22.13).

```sh
npm run install:ci
cp .dev.vars.example .dev.vars
npm run build
npm run db:local
npm run dev
```

Open http://127.0.0.1:5173/studio/, use Sign in with ChatGPT (local mock user `seedy@sites.test`), then Initialize workspace. This imports the 12 starter drafts once. The mock sign-in is local-only and excluded from production.

If your local database was manually initialized previously, do not replay those SQL files. The local migration helper tracks files applied through that helper in a local-only ledger. Hosted migrations are applied by the Sites publishing workflow and do not use this local ledger.

```sh
npm run check
npm test
```

The tests exercise real isolated Miniflare D1/R2 storage with mocked AI responses. Production and local databases are separate.

## Runtime configuration

Store runtime values with the hosting service, never in browser code, Git or `.openai/hosting.json`:

| Variable | Purpose |
| --- | --- |
| `CDC_OWNER_EMAIL` | Trusted owner's signed-in email; required to initialize the owner role. |
| `OPENAI_API_KEY` | Secret enabling live generation. |
| `AI_TEXT_MODEL` | Text model; defaults to `gpt-5-mini`. |
| `AI_IMAGE_MODEL` | Image model; defaults to `gpt-image-2`. |

The Site declares logical `DB` and `BUCKET` bindings. A deployed Site retains its existing project ID and private audience; the generic repository manifest deliberately excludes the current deployment identity. Use the Sites workflow to associate the checkout with the existing project before deploying. Do not create a replacement Site.

## Access model

Production authentication is provided by the Sites gateway. The API trusts its injected user ID/email headers. Do not expose the Worker directly behind an untrusted gateway that lets callers forge these headers.

The configured owner initializes the workspace. The owner can assign editor/reviewer roles by email; colleagues must separately receive access to the private Site, sign in, and accept their assigned workspace role. Assigning a role does not send invitation email or alter hosting access. The owner can revoke workspace roles.

- Owner: edit drafts, review, and manage roles.
- Editor: create/edit drafts, request generation and submit for review.
- Reviewer: read drafts and approve or request changes.

A version check prevents stale writes from replacing another person's edits. Reviewer identity comes from the authenticated account, not a typed name. Review checkboxes record an attestation; the application does not independently verify a clinician's credentials.

## AI workflow and limits

An explicit user request creates one draft or one image. Text generation receives only the selected verified clinic topic and the creative brief. Output is validated and always starts Draft. Images are illustrative brand artwork; never fabricate patient results, clinic photographs or doctor portraits.

Generation jobs use unique request IDs. Reusing an identical completed request returns its saved result; pending, failed or uncertain requests are not automatically replayed. After a timeout, use Recent AI requests before initiating another request. Default limits are ten text generations and five image generations per user per UTC day. These limits complement provider billing controls; they do not set a monetary spending limit.

If a draft changes while artwork is generated, the new image is retained in the request history without overwriting the draft. Artwork attachment also resets review. Workspace capacity is 500 drafts; imports are capped at 50 and are transactional.

Model availability and image generation access depend on the configured OpenAI project. API integration references: [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) and [image generation](https://developers.openai.com/api/docs/guides/image-generation).

## Files

- `public/`: preserved website and marketing UI, with assets.
- `app/`: HTML entry routes and protected studio API route.
- `lib/marketing/core.mjs`: authentication, roles, draft/review state, generation and storage.
- `lib/marketing/knowledge.json`: curated clinic topics and starter campaign.
- `db/schema.ts`, `drizzle/`: schema and append-only migration history.
- `tests/marketing.test.mjs`: backend integration tests.
- `build/`, `scripts/`: maintained Sites runtime/build support.

## Remaining launch work

Live text and image generation have been confirmed by the owner. Clinic information has been cross-checked against the original website (see docs/content-verification.json); the clinic must confirm that it remains current. Grant real reviewers Site access and supply authentic clinic photography and approved biographies. Later, connect the clinic's social accounts and implement provider-specific scheduling, publication receipts and analytics. No posts are sent by this version.
