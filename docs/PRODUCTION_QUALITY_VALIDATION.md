# Production quality validation

## Purpose

Source checks and headless Chrome reduce regressions. They do not prove production behavior across assistive technologies, operating systems, browsers, network conditions, third-party transactions, or the custom domain.

Use this plan against the deployed commit shown by:

```text
https://pranaysuyash.com/build-info.json
```

Keep the resulting evidence in a private operating folder or a reviewed, non-sensitive audit artifact. Do not publish raw enquiries, booking details, payment data, or screen-reader recordings containing personal information.

## Release identity

Before testing:

```bash
LOCAL_SHA="$(git rev-parse HEAD)"
LIVE_SHA="$(curl --fail --silent --show-error https://pranaysuyash.com/build-info.json | python3 -c 'import json,sys; print(json.load(sys.stdin)["commit"])')"
printf 'Local: %s\nLive:  %s\n' "$LOCAL_SHA" "$LIVE_SHA"
test "$LOCAL_SHA" = "$LIVE_SHA"
```

Record:

```yaml
release_sha:
deployed_at:
tester:
production_domain:
cloudflare_deployment_url:
```

Do not continue a release audit against a stale custom domain.

## Route matrix

Test each route at least once on desktop and mobile:

- `/`
- `/hire-me`
- `/work-with-me`
- `/contact?type=role&source=production-qa`
- `/contact?type=project&source=production-qa`
- `/work`
- one flagship case page for each maturity state
- `/proof`
- `/books/no-claim-without-evidence`
- `/books/no-claim-without-evidence/sample`
- `/product-lab/`
- `/privacy`
- `/accessibility`
- `/build-info.json`

## Browser and device matrix

Minimum:

```yaml
desktop:
  - macOS Safari current stable
  - macOS Chrome current stable
  - Firefox current stable on macOS or Windows
  - Edge current stable on Windows or a representative Chromium check
mobile:
  - iOS Safari on a real iPhone
  - Android Chrome on a real Android device
```

For each, inspect:

- first load and hard refresh;
- navigation and mobile modal menu;
- back/forward behavior;
- dark/light/system theme;
- India/global pricing selection and persistence;
- Contact role/project query routing and mode switching;
- form labels, validation, loading, success, and failure states;
- book → sample → checkout path;
- external links and new-tab behavior;
- product-lab fallback and interaction;
- horizontal overflow at 320, 375/390, 768, 1024, and large desktop widths;
- readable code blocks and tables on the sample route;
- image sharpness and captions;
- reduced-motion preference.

## Keyboard validation

Use keyboard only:

1. Start at the address bar and tab into the page.
2. Confirm the skip link appears and moves focus to main content.
3. Tab through primary navigation in a logical order.
4. Open the mobile menu, verify focus moves inside, cycles within it, closes with Escape, and returns to the trigger.
5. Operate theme, pricing, Contact mode, form controls, and CTA links without a pointer.
6. Confirm focus is visible against every background.
7. Confirm no focus enters hidden controls or content behind a modal.
8. Submit intentionally invalid form fields and identify each error without colour alone.

Record route, browser, control, expected result, observed result, and evidence location for each failure.

## Screen-reader validation

### macOS and iOS VoiceOver

Check:

- rotor/landmarks expose header, navigation, main, sections, forms, and footer;
- one clear page-level heading;
- heading hierarchy communicates page structure;
- workflow-map/product-image alt and captions are not duplicated excessively;
- maturity labels and evidence boundaries make sense without colour;
- mobile dialog announces its name and modal state;
- pressed states announce on Contact mode and regional pricing controls;
- form labels, required state, validation, loading, success, and failure are announced;
- code blocks in the book sample remain navigable;
- external link context is understandable;
- product-lab fallback is reachable without entering an unusable canvas.

### Windows NVDA or equivalent

Repeat the critical role/commercial Contact flow, Work evidence page, and book/sample purchase path. Browser automation cannot substitute for the accessibility tree and speech output of a real assistive technology.

### Android TalkBack

Check mobile navigation, headings, Contact mode switching, pricing controls, and sample purchase path on a real device.

## Zoom and reflow

Test browser zoom at:

- 200%;
- 400% where the browser/platform permits;
- large text / increased text size on iOS;
- Android font size and display size increased.

Pass conditions:

- no two-dimensional scrolling for ordinary page content at 320 CSS px equivalent;
- controls remain reachable;
- text does not overlap or clip;
- sticky elements do not hide focused content;
- code/preformatted content may scroll horizontally inside its own container but must not expand the full page;
- buttons and labels remain understandable.

## Contrast and platform modes

Automated token contrast is already part of the source release. Also inspect:

- Windows High Contrast / forced-colours mode;
- macOS Increase Contrast;
- dark mode with browser form autofill;
- selected and pressed states without relying on subtle background tint alone;
- focus rings over dark hero sections and cards;
- workflow-map labels and captions.

## Performance and Core Web Vitals

Capture a production Lighthouse or browser performance report for at least:

- Home mobile;
- Work mobile;
- Book sample mobile;
- Contact mobile;
- Product Lab separately, because it intentionally carries the Three.js runtime.

Use a stable network profile and record the tool/browser version and date.

Production target for standard HTML routes:

```yaml
LCP: <= 2.5s at p75 target
INP: <= 200ms at p75 target
CLS: <= 0.1 at p75 target
Lighthouse_accessibility: >= 95, followed by manual review
Lighthouse_best_practices: >= 95
```

These are targets, not claims until real field or repeatable lab evidence exists. Do not combine Product Lab payload with the core-site budget when explaining ordinary route performance.

Inspect:

- render-blocking resources;
- font loading and layout shift;
- first-load JS;
- oversized images;
- long tasks after hydration;
- repeated client fetch to `/cdn-cgi/trace`;
- mobile menu and pricing interaction latency;
- product-lab main-thread and memory behavior.

## Security-header and domain checks

Run:

```bash
curl --fail --silent --show-error --head https://pranaysuyash.com/
curl --fail --silent --show-error --head https://www.pranaysuyash.com/
curl --fail --silent --show-error --head https://pranaysuyash.com/product-lab/
curl --fail --silent --show-error https://pranaysuyash.com/build-info.json | python3 -m json.tool
```

Verify:

- HTTPS and intended apex/`www` redirect/canonical behavior;
- HSTS;
- Content-Security-Policy;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- frame-ancestor protection;
- no unexpected external runtime scripts;
- immutable caching for `_next/static`;
- bounded caching for assets, book files, and product lab;
- no source maps, secrets, `.env`, repository metadata, or publication-only files exposed unintentionally;
- FormBold, Cal.com, and Dodo destinations exactly match intended providers.

Use an external header scanner only as supplementary evidence; inspect the actual response because scoring tools can reward headers that break required functionality or miss route-specific differences.

## Social and discovery checks

Inspect live unfurls for:

- root URL;
- Work;
- Experience;
- Commercial Engagements;
- book overview;
- book sample.

Check:

- image renders and is not stale;
- title/description use the operational-AI promise;
- canonical URL is correct;
- no publication-only cover URL 404s;
- LinkedIn/X/Slack/WhatsApp previews where practical;
- sitemap and robots are reachable;
- search snippets are recorded rather than assumed from metadata.

## Contact transaction tests

Use clearly marked reversible test data.

### Role

1. Open `/contact?type=role&source=production-role-test`.
2. Confirm role mode is selected and budget/timeline are absent.
3. Submit the form.
4. Confirm FormBold/inbox receives:
   - `mode=role`;
   - `source=production-role-test:role`;
   - expected fields;
   - no honeypot value.
5. Confirm success and failure UI remains accessible.

### Commercial

1. Open `/contact?type=project&source=production-project-test`.
2. Confirm commercial mode and regional engagement scope.
3. Submit a synthetic workflow brief.
4. Confirm inbox receives:
   - `mode=project`;
   - `source=production-project-test:project`;
   - timeline;
   - budget/engagement scope.

Delete or label the test submissions according to the real operating process.

## Cal.com transaction tests

Complete one 15-minute and one 30-minute test booking for each relevant role/commercial path where practical.

Verify:

- event duration;
- timezone display and stored timezone;
- confirmation email/calendar event;
- rescheduling;
- cancellation;
- no double booking;
- standard attribution fields stored:
  - `utm_source=pranaysuyash.com`;
  - `utm_medium=portfolio`;
  - correct role/commercial campaign;
  - correct duration/mode content value.

Do not copy attendee identity into the public measurement ledger.

## Dodo purchase and fulfilment tests

Use real reversible purchases and retain receipts privately.

### India path

Verify:

- ₹799 or the current approved India price;
- currency, tax, billing, receipt/invoice behavior;
- payment succeeds;
- entitlement and PDF/EPUB delivery;
- download files match the current protected package checksums;
- support instructions;
- cancellation/refund path;
- refunded order is reconciled separately.

### Global path

Verify the equivalent flow for $14.99 or the current approved global price, including applicable tax and currency behavior.

Do not claim source-level Dodo attribution from arbitrary static-link query parameters. Add source metadata only after an API-created Checkout Session has been implemented and verified in payment/webhook records.

## Evidence record

For every test, use:

```yaml
test_id:
release_sha:
date:
platform:
browser_or_assistive_technology:
route:
scenario:
expected:
observed:
result: pass | fail | blocked | not_applicable
evidence_location:
issue_or_fix:
retested_at:
retest_result:
```

Sensitive screenshots, emails, invoices, booking records, and recordings must remain private. Public audit records should contain only aggregate result, date, environment, and release SHA.

## Release decision

A production-quality pass requires:

- exact live SHA;
- no unresolved critical navigation, form, checkout, accessibility, privacy, or security failure;
- browser/device matrix complete;
- assistive-technology paths complete;
- transaction paths complete;
- performance evidence recorded with limitations;
- failed cases fixed and retested against the same or a newer identified release;
- `live-deployment` green.

## 10/10 condition

The technical quality score can reach 10/10 only when repository source, HTTP, hydrated Chrome, clean deployment provenance, real cross-browser/device checks, assistive-technology evidence, production performance/security evidence, and real third-party transactions all agree on the same identified release.
