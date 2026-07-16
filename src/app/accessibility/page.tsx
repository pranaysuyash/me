import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Keyboard, Mail, MonitorSmartphone, Volume2 } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Accessibility Statement | Pranay Suyash",
  description:
    "Accessibility goals, tested behaviours, known boundaries, and a direct feedback route for pranaysuyash.com.",
  alternates: { canonical: "https://pranaysuyash.com/accessibility" },
};

const tested = [
  "Visible keyboard focus on primary links, buttons, form controls, product-lab tabs, and case-study actions",
  "Skip-to-content support and semantic page landmarks",
  "Responsive layouts at narrow mobile, tablet, and desktop widths",
  "Reduced-motion handling for site transitions and the interactive systems lab",
  "Readable fallback content when WebGL, JavaScript modules, or external graphics support are unavailable",
  "Labels, instructions, status messages, and privacy warnings on the enquiry forms",
  "Text alternatives and explicit captions for portfolio workflow diagrams",
] as const;

const boundaries = [
  "The site is designed toward WCAG 2.2 AA rather than claiming independent certification.",
  "Third-party checkout, scheduling, GitHub, and form-delivery surfaces have their own accessibility implementations.",
  "The Three.js lab is progressive enhancement; all factual case-study content remains available without it.",
  "PDF and EPUB accessibility is validated structurally, but assistive-technology behaviour may vary by reader application.",
] as const;

export default function AccessibilityPage() {
  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1040px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/70">Accessibility statement</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            The important professional and product evidence should remain usable without perfect vision, motion, input, or graphics conditions.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
            Last reviewed 16 July 2026. Accessibility is treated as an operating constraint and release concern, not a decorative compliance badge.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1040px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.68fr_1.32fr] lg:px-8">
          <div>
            <Keyboard className="h-6 w-6 text-primary" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">Behaviours included in the release review</h2>
          </div>
          <ul className="divide-y border-y">
            {tested.map((item) => (
              <li key={item} className="flex items-start gap-3 py-5 text-sm leading-7 text-muted-foreground">
                <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-[1040px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border-y py-6 sm:px-5">
              <Keyboard className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">Keyboard</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Primary navigation, forms, tabs, case links, theme control, and mobile menu actions are keyboard reachable.</p>
            </div>
            <div className="border-y py-6 sm:px-5">
              <MonitorSmartphone className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">Responsive reading</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Content reflows for mobile and zoomed layouts without making the evidence dependent on a wide canvas.</p>
            </div>
            <div className="border-y py-6 sm:px-5">
              <Volume2 className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">Non-visual fallback</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Visual maps have alt text and captions; the interactive lab always links back to standard HTML case studies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1040px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.68fr_1.32fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Known boundaries</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">These are stated explicitly so an accessibility goal is not presented as independent certification.</p>
          </div>
          <ul className="divide-y border-y">
            {boundaries.map((item) => (
              <li key={item} className="py-5 text-sm leading-7 text-muted-foreground">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y bg-[#102022] py-14 text-white">
        <div className="container mx-auto flex max-w-[1040px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-teal-100/70">
              <Mail className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Report a barrier</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">Describe the page, device, assistive technology, and the action that failed.</h2>
          </div>
          <Link href="mailto:pranay.suyash@gmail.com?subject=Accessibility%20feedback%20for%20pranaysuyash.com" className="inline-flex items-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/[0.06]">
            Send accessibility feedback
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
