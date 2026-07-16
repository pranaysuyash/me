#!/usr/bin/env python3
"""Generate a small deployment identity record for the static export."""

from __future__ import annotations

import json
import os
import re
import subprocess
from datetime import UTC, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "build-info.json"
PORTFOLIO_SOURCE = ROOT / "src" / "lib" / "portfolio.ts"


def resolve_commit() -> str:
    for name in ("CF_PAGES_COMMIT_SHA", "GITHUB_SHA", "VERCEL_GIT_COMMIT_SHA"):
        value = os.environ.get(name, "").strip()
        if re.fullmatch(r"[a-f0-9]{40}", value):
            return value

    try:
        value = subprocess.check_output(
            ["git", "rev-parse", "HEAD"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
        if re.fullmatch(r"[a-f0-9]{40}", value):
            return value
    except (OSError, subprocess.CalledProcessError):
        pass

    return "unknown"


def evidence_review_date() -> str:
    content = PORTFOLIO_SOURCE.read_text(encoding="utf-8")
    dates = sorted(set(re.findall(r'evidenceReviewedAt:\s*"(\d{4}-\d{2}-\d{2})"', content)))
    if len(dates) != 1:
        raise RuntimeError(
            "expected all audited projects to share one evidence review date; "
            f"found {dates or 'none'}"
        )
    return dates[0]


def main() -> None:
    commit = resolve_commit()
    payload = {
        "site": "pranaysuyash.com",
        "repository": "pranaysuyash/me",
        "branch": os.environ.get("CF_PAGES_BRANCH", os.environ.get("GITHUB_REF_NAME", "main")),
        "commit": commit,
        "commitShort": commit[:12] if commit != "unknown" else "unknown",
        "builtAt": datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "evidenceReviewedAt": evidence_review_date(),
        "releaseContract": "career-platform-v2",
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(
        "generated public/build-info.json "
        f"for {payload['commitShort']} with evidence review {payload['evidenceReviewedAt']}"
    )


if __name__ == "__main__":
    main()
