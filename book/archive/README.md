# Book Production Archive

This directory preserves superseded manuscripts, scripts, build systems, and
review artifacts that explain how the publication evolved.

## Preservation Policy

- Superseded source-worthy artifacts are archived, not deleted.
- Historical scripts retain their original bytes and filenames.
- Each imported toolchain gets a dated directory, provenance note, and checksum
  manifest.
- Archived scripts are not silently placed on the active build path.
- `book/tools/` and the scripts referenced by `package.json` remain canonical.
- An archived implementation may be reused only after its assumptions, paths,
  dependencies, and output contract are reviewed against the current book.

Generated caches such as `__pycache__/` and `.pyc` files are not historical
source artifacts and remain excluded.
