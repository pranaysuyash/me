#!/usr/bin/env python3
"""Generate a dependency-free, print-ready PDF resume for the static site."""

from __future__ import annotations

import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "pranay-suyash-resume.pdf"
PAGE_WIDTH = 595
PAGE_HEIGHT = 842
LEFT = 48
RIGHT = 48
TOP = 48


def pdf_escape(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace("(", "\\(")
        .replace(")", "\\)")
        .encode("latin-1", "replace")
        .decode("latin-1")
    )


def text_command(x: float, y: float, text: str, size: float = 9.4, font: str = "F1") -> str:
    return f"BT /{font} {size:.1f} Tf {x:.1f} {y:.1f} Td ({pdf_escape(text)}) Tj ET"


def line_command(x1: float, y1: float, x2: float, y2: float, width: float = 0.6) -> str:
    return f"{width:.2f} w {x1:.1f} {y1:.1f} m {x2:.1f} {y2:.1f} l S"


class Page:
    def __init__(self) -> None:
        self.commands: list[str] = []
        self.y = PAGE_HEIGHT - TOP

    def add(self, command: str) -> None:
        self.commands.append(command)

    def text(self, text: str, *, size: float = 9.4, font: str = "F1", indent: float = 0) -> None:
        self.add(text_command(LEFT + indent, self.y, text, size, font))
        self.y -= size + 3.2

    def wrapped(
        self,
        text: str,
        *,
        width: int = 96,
        size: float = 9.2,
        font: str = "F1",
        indent: float = 0,
        first_prefix: str = "",
        next_prefix: str = "",
    ) -> None:
        lines = textwrap.wrap(
            text,
            width=width,
            break_long_words=False,
            break_on_hyphens=False,
        ) or [""]
        for index, line in enumerate(lines):
            prefix = first_prefix if index == 0 else next_prefix
            self.text(prefix + line, size=size, font=font, indent=indent)

    def section(self, title: str) -> None:
        self.y -= 5
        self.add(line_command(LEFT, self.y, PAGE_WIDTH - RIGHT, self.y, 0.7))
        self.y -= 13
        self.text(title.upper(), size=9.0, font="F2")
        self.y -= 1

    def bullet(self, text: str, *, width: int = 93) -> None:
        self.wrapped(text, width=width, size=8.8, indent=8, first_prefix="- ", next_prefix="  ")


def build_pages() -> list[Page]:
    pages = [Page()]
    page = pages[-1]

    page.text("PRANAY SUYASH", size=22, font="F2")
    page.text("Product Leader and Hands-on Systems Builder", size=12.2, font="F2")
    page.text("Bengaluru, India | Remote and distributed teams", size=9.2)
    page.text("pranaysuyash.com | linkedin.com/in/pranaysuyash", size=9.2)
    page.y -= 4

    page.section("Profile")
    page.wrapped(
        "Product leader with 14+ years across software engineering, Big Four transformation, and a YC-backed healthcare company. Strongest in sustained roles where operating reality, product judgment, platform decisions, and hands-on execution must stay connected across AI-assisted systems, internal tools, document workflows, and local-first products.",
        width=100,
        size=9.4,
    )

    page.section("Selected impact")
    for item in [
        "14+ years across software, consulting, product, and operating leadership.",
        "Reduced an insurance sales and operations workflow from roughly four weeks to roughly ten days.",
        "Helped build and scale MedPiper's product platform to approximately $1M ARR.",
        "Moved SignKit from a recurring workflow problem to a paid local-first desktop product.",
    ]:
        page.bullet(item)

    page.section("Experience")
    page.text("Co-Founder / Head of Product & Platforms | MedPiper Technologies (YC S20)", size=10.2, font="F2")
    page.text("2020 - Present | Bengaluru, India", size=8.8)
    page.wrapped(
        "Healthcare and insurance product platform. Ownership across product strategy, platform architecture, workflow automation, new verticals, AI experimentation, growth initiatives, and regulated-context programmes.",
        width=98,
        size=8.8,
    )
    for item in [
        "Helped build the platform from the ground up and scale the company to approximately $1M ARR.",
        "Reduced insurance sales and operations turnaround from roughly four weeks to roughly ten days.",
        "Owned three product lines and worked across product, engineering, operations, and later-stage AI experiments.",
        "Helped grow the organisation from two co-founders to 45 people at peak.",
        "Led or supported ISO 27001 recertification and SOC 2 programmes.",
    ]:
        page.bullet(item)

    page.y -= 3
    page.text("Senior Business Consultant - SAP Sales & Distribution | EY India", size=10.2, font="F2")
    page.text("2015 - 2020 | Bengaluru, India", size=8.8)
    page.wrapped(
        "Requirements, process mapping, blueprinting, solution design, testing, rollout, and end-user enablement for retail and consumer businesses.",
        width=98,
        size=8.8,
    )
    for item in [
        "Delivered SAP Sales & Distribution implementations for retail and consumer clients.",
        "Contributed to more than $2M in savings through process re-engineering and workflow improvement.",
        "Received multiple EY Excellence Awards for client delivery and team contributions.",
    ]:
        page.bullet(item)

    page.y -= 3
    page.text("Software Engineer | Wipro Technologies", size=10.2, font="F2")
    page.text("2010 - 2013 | Greater Noida, India", size=8.8)
    for item in [
        "Built automation that reduced repetitive telecom document-processing work.",
        "Implemented data pipelines and metadata layers for network inventory workflows.",
    ]:
        page.bullet(item)

    page = Page()
    pages.append(page)
    page.text("PRANAY SUYASH", size=13, font="F2")
    page.text("Selected product evidence and capabilities", size=9.2)

    page.section("Selected product evidence")
    projects = [
        (
            "MedPiper insurance workflow transformation",
            "Sanitized professional case study: fragmented insurance operations to explicit stages, ownership, automation, exception handling, and roughly ten-day turnaround.",
        ),
        (
            "SignKit - Commercial product",
            "Paid local-first desktop workflow for signature-image extraction, cleanup, and PDF placement. Signatures are treated as visual assets, not certified e-signatures.",
        ),
        (
            "MetaExtract - Working product build",
            "File and document metadata inspection with structured output, provenance, review surfaces, and explicit quality boundaries.",
        ),
        (
            "SentinelTwin - Active platform build",
            "Spatial-security editor and simulation foundation that separates deterministic coverage and path claims from AI explanation.",
        ),
        (
            "EchoPanel - Working prototype",
            "Native macOS direction for recording, local transcription, transcript navigation, and retrieval, with system-audio setup and packaging still active work.",
        ),
    ]
    for title, body in projects:
        page.text(title, size=9.8, font="F2")
        page.wrapped(body, width=98, size=8.8)
        page.y -= 3

    page.section("Core capabilities")
    for item in [
        "Product leadership: strategy, discovery, roadmap decisions, prioritisation, workflow design, and cross-functional ownership.",
        "Applied AI: document intelligence, RAG, extraction evaluation, evidence links, review states, and fallbacks.",
        "Product systems: internal tools, workflow automation, local-first products, and spatial simulation.",
        "Technical: Python, TypeScript, React, FastAPI, Swift, SQL, Docker, and model integration.",
        "Delivery: regulated context, deployment, documentation, decision logs, stakeholder alignment, and training.",
    ]:
        page.bullet(item)

    page.section("Education and additional evidence")
    page.bullet("PGDM, FORE School of Management, 2013-2015.")
    page.bullet("B.Tech in Computer Science, Amity School of Engineering & Technology, 2006-2010.")
    page.bullet("Y Combinator: MedPiper, S20 cohort.")
    page.bullet(
        "Author of No Claim Without Evidence, a 19-chapter field guide to evidence, evals, review rules, action traces, and release gates for AI-assisted workflows."
    )

    page.section("Role fit")
    for item in [
        "AI Product Lead, Principal Product Manager, Product Systems Lead, or Head of Product for workflow-heavy products.",
        "Best fit where product judgment, operational reality, and visible implementation need to remain connected.",
        "Open to selective senior product roles with a clear long-term mandate and remote or distributed teams; current commitment and transition timing are discussed directly.",
    ]:
        page.bullet(item)

    return pages


def build_pdf() -> bytes:
    pages = build_pages()
    objects: list[bytes] = []

    def add_object(content: bytes) -> int:
        objects.append(content)
        return len(objects)

    font_regular = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    font_bold = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    pages_object_index = add_object(b"")
    page_object_ids: list[int] = []

    for page in pages:
        stream = "\n".join(page.commands).encode("latin-1", "replace")
        content_id = add_object(
            f"<< /Length {len(stream)} >>\nstream\n".encode("ascii")
            + stream
            + b"\nendstream"
        )
        page_id = add_object(
            (
                f"<< /Type /Page /Parent {pages_object_index} 0 R "
                f"/MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
                f"/Resources << /Font << /F1 {font_regular} 0 R /F2 {font_bold} 0 R >> >> "
                f"/Contents {content_id} 0 R >>"
            ).encode("ascii")
        )
        page_object_ids.append(page_id)

    kids = " ".join(f"{page_id} 0 R" for page_id in page_object_ids)
    objects[pages_object_index - 1] = (
        f"<< /Type /Pages /Kids [{kids}] /Count {len(page_object_ids)} >>"
    ).encode("ascii")
    catalog_id = add_object(f"<< /Type /Catalog /Pages {pages_object_index} 0 R >>".encode("ascii"))
    info_id = add_object(
        b"<< /Title (Pranay Suyash - Resume) /Author (Pranay Suyash) /Subject (Product leadership and systems building) >>"
    )

    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(output))
        output.extend(f"{index} 0 obj\n".encode("ascii"))
        output.extend(obj)
        output.extend(b"\nendobj\n")

    xref = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    output.extend(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_id} 0 R /Info {info_id} 0 R >>\n"
            f"startxref\n{xref}\n%%EOF\n"
        ).encode("ascii")
    )
    return bytes(output)


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_bytes(build_pdf())
    print(f"generated {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
