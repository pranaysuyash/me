#!/usr/bin/env python3
"""Remove publication-only source assets from the deployable static export.

The print cover remains tracked under public/ because the publication toolchain uses
it as a protected source. It must not be deployed as a duplicate multi-megabyte web
asset. Existing public URLs are preserved through Cloudflare redirects.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
PUBLICATION_ONLY = (
    OUT / "books" / "no-claim-without-evidence" / "cover.png",
)


def main() -> None:
    if not OUT.is_dir():
        raise SystemExit("static export does not exist: run next build before pruning")

    removed = 0
    released_bytes = 0
    for target in PUBLICATION_ONLY:
        resolved = target.resolve()
        if OUT.resolve() not in resolved.parents:
            raise SystemExit(f"refusing to prune outside out/: {target}")
        if not target.exists():
            continue
        released_bytes += target.stat().st_size
        target.unlink()
        removed += 1

    print(
        f"web export pruning complete: removed {removed} publication-only asset(s), "
        f"released {released_bytes} bytes"
    )


if __name__ == "__main__":
    main()
