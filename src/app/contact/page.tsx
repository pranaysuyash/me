"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  Workflow,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RegionalBudgetSelect } from "@/components/regional-budget-select";

const FORMBOLD_ENDPOINT = "https://formbold.com/s/6QZJn";
const CAL_15MIN = "https://cal.com/pranaysuyash/15min";
const CAL_30MIN = "https://cal.com/pranaysuyash/30min";

type ContactMode = "project" | "role";

const initialFormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  message: "",
  timeline: "",
  budget: "",
  source: "general",
  mode: "project",
  honeypot: "",
};

export default function ContactPage() {
  const [mode, setMode] = useState<ContactMode>("project");
  const [leadSource, setLeadSource] = useState("general");
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source") || "general";
    const type = params.get("type") || "project";
    const resolvedMode: ContactMode = type === "call" || type === "role" ? "role" : "project";
    const resolvedSource = `${source}:${resolvedMode}`;

    setMode(resolvedMode);
    setLeadSource(resolvedSource);
    setFormData((previous) => ({
      ...previous,
      source: resolvedSource,
      mode: resolvedMode,
    }));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(FORMBOLD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (!response.ok) throw new Error("The form could not be sent.");

      setStatus("success");
      setFormData({
        ...initialFormData,
        source: leadSource,
        mode,
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong while sending the form.",
      );
    }
  };

  const roleMode = mode === "role";

  return (
    <PageLayout>
      <section className="border-b bg-[#0d1718] text-white">
        <div className="container mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <div className="flex items-center gap-3 text-teal-100/70">
            {roleMode ? <BriefcaseBusiness className="h-5 w-5" /> : <Workflow className="h-5 w-5" />}
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              {roleMode ? "For hiring teams" : "Start with the workflow"}
            </p>
          </div>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
            {roleMode
              ? "Share the role, the team, and where this ownership matters."
              : "Describe the work as it exists today."}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/70 md:text-lg">
            {roleMode
              ? "The useful first message includes the role scope, reporting context, product stage, and why a product leader who stays close to implementation would be valuable."
              : "The useful first message includes who does the work, what inputs arrive, where time or trust breaks down, and what a better system would change."}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
          <form onSubmit={handleSubmit} className="border-y py-8 md:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {roleMode ? "Role context" : "Project brief"}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {roleMode ? "Enough context for a serious response" : "Enough context for a useful fit assessment"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {roleMode
                ? "I will respond with fit, relevant evidence, and the right next conversation."
                : "I will respond with fit, likely engagement shape, and the next information needed. No generic sales sequence."}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name <span className="text-destructive">*</span></label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Work email <span className="text-destructive">*</span></label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company or team</label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="website" className="mb-1.5 block text-sm font-medium">
                  {roleMode ? "Role or company link" : "Website or product link"}
                </label>
                <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://" />
              </div>
            </div>

            {!roleMode && (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select timing</option>
                    <option value="urgent">Need to start within 2 weeks</option>
                    <option value="month">Within a month</option>
                    <option value="quarter">This quarter</option>
                    <option value="exploring">Exploring, no fixed date</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">Rough engagement scope</label>
                  <RegionalBudgetSelect value={formData.budget} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                {roleMode ? "Role, team context, and why this fit matters" : "Current workflow, failure point, and desired outcome"} <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                rows={8}
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  roleMode
                    ? "What would this person own? What stage is the product or company at? Where do product judgment and execution currently separate?"
                    : "Who does the work today? What inputs arrive? Where does time, accuracy, or trust break down? What would a useful system change?"
                }
                required
              />
            </div>

            <input type="hidden" name="source" value={formData.source} />
            <input type="hidden" name="mode" value={formData.mode} />
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-site">Company site</label>
              <input id="company-site" type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>

            <Button type="submit" disabled={status === "loading"} className="mt-6 w-full rounded-md" size="lg">
              {status === "loading"
                ? "Sending..."
                : roleMode
                  ? "Send role context"
                  : "Send project brief"}
              <Send className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              Submitted information is used only to assess and respond to the enquiry under the <Link href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>. Do not include passwords, payment details, medical records, or other sensitive personal information.
            </p>

            <div aria-live="polite" aria-atomic="true">
              {status === "success" && <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">Sent successfully. I will reply within two business days.</p>}
              {status === "error" && <p className="mt-4 text-center text-sm text-destructive">{errorMessage} Use email if the problem continues.</p>}
            </div>
          </form>

          <aside className="space-y-8">
            <div className="border-y py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Prefer a call?</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Choose the smallest useful conversation.</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Use 15 minutes for fit and direction. Use 30 minutes when there is already a workflow, role brief, examples, or an existing product to review.
              </p>
              <div className="mt-6 grid gap-3">
                {[{ href: CAL_15MIN, title: "15-minute fit call", note: "Fit and next step" }, { href: CAL_30MIN, title: "30-minute working call", note: "Workflow, role, or constraints" }].map((item) => (
                  <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-t py-4 hover:text-primary">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div><p className="text-sm font-semibold">{item.title}</p><p className="text-xs text-muted-foreground">{item.note}</p></div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-y py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Direct channels</p>
              <div className="mt-5 space-y-4">
                <Link href="mailto:pranay.suyash@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"><Mail className="h-4 w-4 text-primary" />Email</Link>
                <Link href="https://linkedin.com/in/pranaysuyash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"><Linkedin className="h-4 w-4 text-primary" />LinkedIn</Link>
                <Link href="https://github.com/pranaysuyash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"><Github className="h-4 w-4 text-primary" />GitHub</Link>
              </div>
            </div>

            <div className="border-l-2 border-primary pl-5">
              <p className="text-sm font-semibold">Commercial engagement</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Custom project and advisory terms are handled separately through PSRS Technologies Private Limited where applicable. This personal site remains the professional and proof-of-work surface.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
