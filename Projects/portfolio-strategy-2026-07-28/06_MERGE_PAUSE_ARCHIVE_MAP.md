# Merge, pause and archive map

## Canonical capability families

| Canonical family | Keep as canonical | Merge/reference from | Commercial status |
|---|---|---|---|
| DocumentOps | new operating layer + SignKit | MetaExtract, sig-ext, document_summarizer, mer_extract, django-image-analyzer | primary cash engine |
| Policy Intelligence | insurance_q | rag_insurance, health-rule-engine, claims dashboard; Kenya SHIF as case/eval | primary software bet |
| Audio intelligence | EchoPanel | stt, stt_main, speech-experiments, avia_new, llm-transcript-translate, echoai-mlx, echo-ctrl | component only |
| Photo/media search | photo-search | photosearch-experiment | portfolio/component |
| Scene/media intelligence | scene-guide-v3 or a chosen new canonical repo | SceneGuide, frame_analyser, segmentation and card-scan experiments | portfolio/safety-gated |
| AI learning content | one private/public canonical AI Glossary repo | aiglossarypro, aiglossarypro_v2, aiglossary_v2 | audience asset |
| Security/spatial | FieldCanvas core + SentinelTwin vertical | no new parallel spatial repos | customer-gated |
| Ad commerce | AdShot | caption-art, interior-photo, e-com-template, stikky | customer-gated |
| Research reproduction | one ICML canonical repo | fast-track and claim-closure forks | career asset |
| Portfolio | me | profile and old site repos | sales/distribution |

## Pause

- ShopStack until a zero-input behavioral wedge is proven.
- Drape until a stylist, resale or retailer distribution partner exists.
- ReLoop commercial development until an institutional distribution partner exists.
- Personal/reflection apps as businesses.
- New child-learning features beyond maintenance.

## Archive/read-only

Tutorial, practice, fork, abandoned scaffold and generic utility repositories should be labelled in the registry and removed from active planning. Archiving does not mean deleting. Preserve code, document the canonical successor and stop dependency/security maintenance unless the repository remains distributed.

## Repository hygiene rules

- One canonical repo per product/capability.
- README must state status: focus, customer-gated, portfolio, paused, merged or archived.
- Merged repos link to the canonical successor and receive no independent roadmap.
- No default branch may be an abandoned agent feature branch for a maintained project.
- Secrets, test credentials, production endpoints and company-sensitive details must be removed from public documentation.
- Large generated assets and model files should move to releases/object storage where appropriate.
