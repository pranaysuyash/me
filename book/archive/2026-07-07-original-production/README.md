# Original July 7 Production Toolchain

Status: **historical, preserved, not active**

These files are byte-for-byte snapshots of the original ebook production tools
recovered from:

`/Users/pranay/Projects/evidence-based-ai-engineering-ebook/tools/`

They were created on July 7, 2026 and recovered into this repository on July 15,
2026. Six scripts materially differ from the current canonical implementations
under `book/tools/`; `README.md` is identical but is retained so the historical
toolchain remains understandable as a complete unit.

## Why Keep Them

- They document the first working PDF, EPUB, HTML, sales-page, and validation
  pipeline.
- They preserve earlier path, packaging, pagination, and validation decisions.
- They make later production improvements reviewable rather than erasing the
  route taken to reach them.
- They can provide recovery ideas if the active toolchain regresses.

## Usage Boundary

Do not invoke these scripts from `package.json` or modify them in place. To reuse
an idea, compare it with `book/tools/`, migrate the useful behavior into the
canonical implementation, add tests, and record the decision. The original
snapshot should remain immutable.

The `SHA256SUMS` file records the imported bytes. Python bytecode caches were not
copied because they are rebuildable runtime output rather than source history.
