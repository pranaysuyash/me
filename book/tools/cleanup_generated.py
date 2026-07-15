#!/usr/bin/env python3
"""Remove only allowlisted, reproducible build caches."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "cleanup-protection.json"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="perform removal; otherwise only print")
    args = parser.parse_args()
    policy = json.loads(MANIFEST.read_text(encoding="utf-8"))
    protected = [(ROOT / value).resolve() for value in policy["protected_roots"] + policy["protected_exact"]]

    for relative in policy["safe_cleanup_roots"]:
        target = (ROOT / relative).resolve()
        if target == ROOT or ROOT not in target.parents:
            raise SystemExit(f"refusing path outside repository: {target}")
        if any(target == path or target in path.parents or path in target.parents for path in protected):
            raise SystemExit(f"refusing cleanup path that overlaps protected content: {target}")
        if not target.exists():
            continue
        print(f"{'remove' if args.apply else 'would remove'}: {target.relative_to(ROOT)}")
        if args.apply:
            if target.is_dir():
                shutil.rmtree(target)
            else:
                target.unlink()

    if not args.apply:
        print("dry run only; pass --apply to remove allowlisted paths")


if __name__ == "__main__":
    main()
