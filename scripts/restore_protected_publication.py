#!/usr/bin/env python3
"""Restore missing tracked publication artifacts from the current Git HEAD.

This script is intentionally conservative:
- it restores only files already tracked at HEAD and covered by cleanup-protection.json;
- it restores only missing paths;
- it never overwrites an existing or locally modified file;
- it uses read-only Git plumbing (`git ls-files` and `git show`) and writes exact blob bytes.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POLICY_PATH = ROOT / "cleanup-protection.json"


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


def run_git(*args: str) -> bytes:
    result = subprocess.run(
        ["git", *args],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0:
        stderr = result.stderr.decode("utf-8", "replace").strip()
        fail(f"git {' '.join(args)} failed: {stderr}")
    return result.stdout


def tracked_protected_paths(policy: dict[str, object]) -> list[str]:
    requested = [
        *[str(value) for value in policy.get("protected_exact", [])],
        *[str(value) for value in policy.get("protected_roots", [])],
    ]
    if not requested:
        fail("cleanup-protection.json contains no protected paths")

    output = run_git("ls-files", "-z", "--", *requested)
    paths = sorted(
        {
            raw.decode("utf-8")
            for raw in output.split(b"\0")
            if raw
        }
    )
    if not paths:
        fail("no tracked protected publication files were found at HEAD")
    return paths


def restore_missing(relative: str) -> bool:
    target = (ROOT / relative).resolve()
    if ROOT not in target.parents:
        fail(f"protected path escapes repository: {relative}")
    if target.exists() or target.is_symlink():
        return False

    blob = run_git("show", f"HEAD:{relative}")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(blob)
    print(f"restored protected artifact: {relative}")
    return True


def main() -> None:
    if not POLICY_PATH.is_file():
        fail("cleanup-protection.json is missing")

    policy = json.loads(POLICY_PATH.read_text(encoding="utf-8"))
    restored = [
        relative
        for relative in tracked_protected_paths(policy)
        if restore_missing(relative)
    ]

    if restored:
        print(f"OK: restored {len(restored)} missing protected publication artifact(s) from HEAD")
    else:
        print("OK: all protected publication artifacts are already present")


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        sys.exit(1)
