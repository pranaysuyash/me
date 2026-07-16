#!/usr/bin/env python3
"""Vendor the pinned Three.js runtime and its complete dependency chain."""

from __future__ import annotations

import sys
import tempfile
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = "0.179.1"
VENDOR_ROOT = f"public/vendor/three/{VERSION}"
PACKAGE_ROOT = f"https://cdn.jsdelivr.net/npm/three@{VERSION}"
USER_AGENT = "pranaysuyash-portfolio-build/1.0"


@dataclass(frozen=True)
class VendorFile:
    relative_path: str
    url: str
    minimum_size: int
    required_tokens: tuple[str, ...]


FILES = (
    VendorFile(
        relative_path=f"{VENDOR_ROOT}/three.module.js",
        url=f"{PACKAGE_ROOT}/build/three.module.js",
        minimum_size=500_000,
        required_tokens=("./three.core.js", "WebGLRenderer", "PerspectiveCamera"),
    ),
    VendorFile(
        relative_path=f"{VENDOR_ROOT}/three.core.js",
        url=f"{PACKAGE_ROOT}/build/three.core.js",
        minimum_size=900_000,
        required_tokens=("REVISION", "class Matrix4", "class Object3D"),
    ),
    VendorFile(
        relative_path=f"{VENDOR_ROOT}/addons/controls/OrbitControls.js",
        url=f"{PACKAGE_ROOT}/examples/jsm/controls/OrbitControls.js",
        minimum_size=20_000,
        required_tokens=("class OrbitControls", "from 'three'", "export { OrbitControls }"),
    ),
    VendorFile(
        relative_path=f"{VENDOR_ROOT}/addons/renderers/CSS2DRenderer.js",
        url=f"{PACKAGE_ROOT}/examples/jsm/renderers/CSS2DRenderer.js",
        minimum_size=3_000,
        required_tokens=("class CSS2DObject", "class CSS2DRenderer", "from 'three'"),
    ),
)

WRAPPERS = {
    "public/vendor/three/three.module.js": f'export * from "./{VERSION}/three.module.js";\n',
    "public/vendor/three/addons/controls/OrbitControls.js": (
        f'export * from "../../{VERSION}/addons/controls/OrbitControls.js";\n'
    ),
    "public/vendor/three/addons/renderers/CSS2DRenderer.js": (
        f'export * from "../../{VERSION}/addons/renderers/CSS2DRenderer.js";\n'
    ),
}


def validate(path: Path, specification: VendorFile) -> tuple[bool, str]:
    if not path.exists():
        return False, "missing"
    size = path.stat().st_size
    if size < specification.minimum_size:
        return False, f"too small ({size} bytes)"
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return False, "not valid UTF-8"
    for token in specification.required_tokens:
        if token not in content:
            return False, f"missing token {token!r}"
    return True, f"valid ({size} bytes)"


def write_atomic(destination: Path, payload: bytes) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        mode="wb",
        prefix=f".{destination.name}.",
        suffix=".tmp",
        dir=destination.parent,
        delete=False,
    ) as temporary:
        temporary.write(payload)
        temporary_path = Path(temporary.name)
    temporary_path.replace(destination)


def download(specification: VendorFile, destination: Path) -> None:
    request = urllib.request.Request(
        specification.url,
        headers={"User-Agent": USER_AGENT, "Accept": "text/javascript,*/*;q=0.1"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        if response.status != 200:
            raise RuntimeError(f"unexpected HTTP status {response.status}")
        payload = response.read()
    write_atomic(destination, payload)


def write_wrappers() -> None:
    for relative_path, content in WRAPPERS.items():
        destination = ROOT / relative_path
        write_atomic(destination, content.encode("utf-8"))
        if destination.read_text(encoding="utf-8") != content:
            raise RuntimeError(f"wrapper verification failed: {relative_path}")
        print(f"three vendor: wrote wrapper {relative_path}")


def main() -> int:
    failures: list[str] = []
    for specification in FILES:
        destination = ROOT / specification.relative_path
        valid, reason = validate(destination, specification)
        if valid:
            print(f"three vendor: reuse {specification.relative_path} ({reason})")
            continue

        try:
            print(f"three vendor: fetch {specification.url}")
            download(specification, destination)
        except (OSError, RuntimeError, urllib.error.URLError) as error:
            fallback_valid, fallback_reason = validate(destination, specification)
            if fallback_valid:
                print(
                    f"three vendor: using validated local copy ({fallback_reason}): {error}",
                    file=sys.stderr,
                )
                continue
            failures.append(f"{specification.relative_path}: {error}")
            continue

        final_valid, final_reason = validate(destination, specification)
        if not final_valid:
            destination.unlink(missing_ok=True)
            failures.append(f"{specification.relative_path}: {final_reason}")
        else:
            print(f"three vendor: wrote {specification.relative_path} ({final_reason})")

    if failures:
        print("Three.js vendoring failed:", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    try:
        write_wrappers()
    except (OSError, RuntimeError) as error:
        print(f"Three.js wrapper generation failed: {error}", file=sys.stderr)
        return 1

    print(
        f"Three.js {VERSION} runtime and three.core.js are available through same-origin wrappers."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
