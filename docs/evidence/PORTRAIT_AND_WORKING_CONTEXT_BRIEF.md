# Authentic portrait and working-context visual brief

## Purpose

The portfolio currently proves systems thinking more strongly than it helps a visitor recognise the person they may hire, interview, or work with. A portrait should add human trust and context without turning the site into a staged founder-brand shoot.

This visual must be a real photograph of Pranay. Do not generate, face-swap, or heavily reconstruct it with AI.

## Required final set

### 1. Primary portrait

Use on Home/About and social identity surfaces where appropriate.

- framing: chest-up or waist-up;
- expression: attentive, direct, natural—not an exaggerated sales smile;
- eye line: camera or slightly off-camera;
- setting: uncluttered real workspace, neutral indoor environment, or soft outdoor context;
- clothing: normal professional working attire, not a suit unless that reflects actual use;
- composition: leave negative space on at least one side for responsive crops;
- orientation: capture both vertical and horizontal versions;
- target files:
  - `public/assets/profile/pranay-portrait.webp`
  - `public/assets/profile/pranay-portrait-square.webp`;
- minimum size: 1600 px on the long edge before export;
- preferred export: WebP, visually lossless, 100–450 KB.

Proposed alt text:

> Portrait of Pranay Suyash in a working environment.

Do not describe clothing, mood, location, or activity in alt text unless it is clearly visible and relevant.

### 2. Working-context photograph

Use selectively on About or Experience, not as a generic hero background.

The image should show one real working behavior:

- reviewing a product or workflow on screen;
- sketching or annotating a process;
- examining a document-heavy system;
- discussing a product decision in a genuine work setting;
- testing a local product on a laptop or desktop.

Target file:

```text
public/assets/profile/pranay-working-context.webp
```

Proposed alt text should describe the visible action, for example:

> Pranay reviewing a document-workflow product on a laptop.

## What must not appear

- customer, patient, employee, or confidential company data;
- Slack, email, calendar, notifications, names, or account details;
- API keys, credentials, terminals containing secrets, or local filesystem paths;
- a real security layout, private product roadmap, financial detail, or contract;
- a product screen that has not passed its own evidence/redaction review;
- unrelated luxury, travel, or lifestyle staging that competes with the professional identity;
- fake team members or staged client meetings;
- AI-generated face, body, office, or screen replacement presented as photography.

## Capture options

### Self-capture

Use a tripod or stable surface, rear camera where practical, natural window light, and a timer/remote. Capture RAW/HEIC plus standard image output. Take several expressions and crops but keep the environment consistent.

### Photographer

Brief the photographer using the primary promise:

> Product leader and hands-on systems builder for document-heavy workflows and operational AI systems.

Ask for professional working context rather than executive-lifestyle imagery. Confirm commercial web/social usage rights in writing.

## Editing boundary

Allowed:

- exposure, white balance, crop, straightening, dust removal;
- subtle skin and clothing cleanup that preserves real texture;
- removal or blur of confidential screen content;
- background distraction reduction;
- consistent colour treatment across the final set;
- responsive crops derived from the approved master.

Not allowed:

- changing facial structure, body shape, age, hairline, or expression materially;
- replacing the environment with a generated office;
- generating hands, devices, screens, or colleagues;
- compositing product UI that was not visible during capture;
- adding awards, logos, customer brands, or company context without permission.

## Approval record

Before public use, record privately or in an approved repository-safe manifest:

```yaml
profile_visual_id:
source_type: real_photograph
captured_at:
photographer_or_self_capture:
usage_rights_confirmed: true | false
identity_approval: true | false
privacy_reviewed: true | false
screen_content_synthetic_or_redacted: true | false
master_file_location:
public_derivatives: []
alt_text:
caption_if_used:
approved_at:
```

## Site integration rule

A portrait should make the person memorable, not replace the evidence hierarchy.

Recommended use:

- one compact portrait near the Home professional summary or About introduction;
- one working-context image in About/Experience if it contributes new information;
- one consistent square crop for social/profile alignment.

Avoid placing the same portrait in the navbar, hero, About, footer, and every case page. One or two purposeful uses are stronger than repetition.

## Completion definition

This finding is closed when:

- the photograph is authentic and approved by Pranay;
- usage rights are clear;
- privacy/security review is complete;
- desktop and mobile crops are inspected;
- alt text reflects what is visible;
- the image is integrated without displacing proof or slowing the homepage materially;
- the release passes static budgets, browser screenshots, mobile overflow, and production social-preview checks.
