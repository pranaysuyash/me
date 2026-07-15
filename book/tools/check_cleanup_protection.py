#!/usr/bin/env python3
"""Enforce the publication cleanup boundary and archive integrity."""

from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "cleanup-protection.json"
PACKAGE_MANIFEST = ROOT / "book/package-manifest.json"


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


def git_output(*args: str) -> str:
    result = subprocess.run(
        ["git", *args], cwd=ROOT, text=True, capture_output=True, check=False
    )
    if result.returncode not in (0, 1):
        fail(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    return result.stdout


def verify_archive_checksums() -> None:
    checksum_file = ROOT / "book/archive/2026-07-07-original-production/SHA256SUMS"
    for raw_line in checksum_file.read_text(encoding="utf-8").splitlines():
        if not raw_line.strip():
            continue
        digest, relative = raw_line.split(maxsplit=1)
        if len(digest) != 64 or any(character not in "0123456789abcdef" for character in digest):
            fail(f"invalid archive checksum digest: {digest}")
        relative = relative.lstrip("* ")
        target = (checksum_file.parent / relative).resolve()
        if checksum_file.parent.resolve() not in target.parents:
            fail(f"archive checksum escapes snapshot root: {relative}")
        if not target.is_file():
            fail(f"archive checksum target is missing: {target.relative_to(ROOT)}")
        actual = hashlib.sha256(target.read_bytes()).hexdigest()
        if actual != digest:
            fail(f"archive checksum mismatch: {target.relative_to(ROOT)}")


def verify_package_freshness() -> None:
    package = json.loads(PACKAGE_MANIFEST.read_text(encoding="utf-8"))
    if package.get("algorithm") != "sha256":
        fail("package manifest must use sha256")
    for group in ("sources", "outputs"):
        entries = package.get(group)
        if not isinstance(entries, dict) or not entries:
            fail(f"package manifest has no {group}")
        for relative, expected in entries.items():
            target = (ROOT / relative).resolve()
            if ROOT not in target.parents or not target.is_file():
                fail(f"package manifest {group} path is invalid: {relative}")
            actual = hashlib.sha256(target.read_bytes()).hexdigest()
            if actual != expected:
                fail(f"publication package is stale; rebuild after changing {relative}")


def main() -> None:
    if not MANIFEST.is_file():
        fail("cleanup-protection.json is missing")
    policy = json.loads(MANIFEST.read_text(encoding="utf-8"))
    protected: set[Path] = set()

    for relative in policy["protected_exact"]:
        target = ROOT / relative
        if not target.is_file():
            fail(f"protected artifact is missing: {relative}")
        protected.add(target)

    protected_roots: list[Path] = []
    for relative in policy["protected_roots"]:
        root = (ROOT / relative).resolve()
        if not root.is_dir():
            fail(f"protected root is missing: {relative}")
        protected_roots.append(root)
        protected.update(path for path in root.rglob("*") if path.is_file() and "__pycache__" not in path.parts)

    for target in protected:
        if target.is_symlink():
            fail(f"protected artifact must not be a symlink: {target.relative_to(ROOT)}")

    relative_paths = sorted(str(path.relative_to(ROOT)) for path in protected)
    tracked = set(git_output("ls-files", "--", *relative_paths).splitlines())
    untracked = [path for path in relative_paths if path not in tracked]
    if untracked:
        fail(f"protected artifacts are not tracked by git: {', '.join(untracked)}")

    ignored = set(git_output("check-ignore", "--no-index", "--", *relative_paths).splitlines())
    if ignored:
        fail(f"protected artifacts are ignored by git: {', '.join(sorted(ignored))}")

    archive_root = ROOT / "book/archive"
    archive_files = {path for path in archive_root.rglob("*") if path.is_file()}
    if not archive_files.issubset(protected):
        missing = sorted(str(path.relative_to(ROOT)) for path in archive_files - protected)
        fail(f"archive files fall outside cleanup protection: {', '.join(missing)}")

    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    active_scripts = "\n".join(package.get("scripts", {}).values())
    if "book/archive" in active_scripts:
        fail("archived scripts must not be part of the active build path")

    protected_boundaries = protected_roots + [path.resolve() for path in protected]
    for relative in policy["safe_cleanup_roots"]:
        safe = (ROOT / relative).resolve()
        if safe == ROOT or ROOT not in safe.parents:
            fail(f"safe cleanup root escapes repository: {relative}")
        for protected_path in protected_boundaries:
            if safe == protected_path or safe in protected_path.parents or protected_path in safe.parents:
                fail(f"safe cleanup root overlaps protected publication content: {relative}")

    verify_archive_checksums()
    verify_package_freshness()
    print(f"OK: cleanup protection covers {len(protected)} tracked artifacts")


if __name__ == "__main__":
    main()
