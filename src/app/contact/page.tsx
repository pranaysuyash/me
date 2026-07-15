"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RegionalBudgetSelect } from "@/components/regional-budget-select";

const FORMBOLD_ENDPOINT = "https://formbold.com/s/6QZJn";
const CAL_15MIN = "https://cal.com/pranaysuyash/15min";
const CAL_30MIN = "https://cal.com/pranaysuyash/30min";

const initialFormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  message: "",
  timeline: "",
  budget: "",
  source: "general",
  honeypot: "",
};

export default function ContactPage() {
  const [leadSource, setLeadSource] = useState("general");
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source") || "general";
    const type = params.get("type");
    const resolvedSource = type ? `${source}:${type}` : source;

    setLeadSource(resolvedSource);
    setFormData((previous) => ({
      ...previous,
      source: resolvedSource,
    }));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      setFormData({ ...initialFormData, source: leadSource });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the form.",
      );
    }
  };

  return (
    <PageLayout>
      <section className="border-b bg-[#10191a] py-20 text-white md:py-24">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-100/75">
              Start with the problem
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Describe the work as it exists today.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              The most useful first message includes who does the work, where it breaks,
              examples of the inputs, the timeline, and what a better system would change.
              A rough screen recording or sample document is more useful than a polished feature list.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-card p-6 shadow-sm md:p-8"
          >
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Project brief
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Enough context for a useful response
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                I will reply with a fit assessment, the most likely engagement shape,
                and the next information needed. No generic sales sequence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Work email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                  Company or team
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label htmlFor="website" className="mb-1.5 block text-sm font-medium">
                  Website or product link
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select timing</option>
                  <option value="urgent">Need to start within 2 weeks</option>
                  <option value="month">Within a month</option>
                  <option value="quarter">This quarter</option>
                  <option value="exploring">Exploring, no fixed date</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
                  Rough engagement scope
                </label>
                <RegionalBudgetSelect
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Current workflow, failure point, and desired outcome{" "}
                <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                rows={8}
                value={formData.message}
                onChange={handleChange}
                placeholder="Who does the work today? What inputs arrive? Where does time, accuracy, or trust break down? What would a useful system change?"
                required
              />
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-site">Company site</label>
              <input
                id="company-site"
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full rounded-md"
              size="lg"
            >
              {status === "loading" ? "Sending brief..." : "Send project brief"}
              <Send className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              By sending this brief, you agree that the submitted information may be used
              to assess and respond to your enquiry under the{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              . Do not include passwords, payment details, medical records, or other
              sensitive personal information.
            </p>

            <div aria-live="polite" aria-atomic="true">
              {status === "success" && (
                <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
                  The brief was sent. I will reply within two business days.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-sm text-destructive">
                  {errorMessage} Email me directly if the problem continues.
                </p>
              )}
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-xl border bg-muted/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Prefer a call first?
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Choose the smallest useful conversation.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Use 15 minutes for fit and direction. Use 30 minutes when you already
                have a workflow, examples, constraints, or an existing product to review.
              </p>
              <div className="mt-5 grid gap-3">
                <Link
                  href={CAL_15MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border bg-background p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">15-minute fit call</p>
                      <p className="text-xs text-muted-foreground">Problem and next step</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href={CAL_30MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border bg-background p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">30-minute working call</p>
                      <p className="text-xs text-muted-foreground">Workflow and constraints</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Direct channels
              </p>
              <div className="mt-5 space-y-4">
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  pranay.suyash@gmail.com
                </Link>
                <Link
                  href="https://linkedin.com/in/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4 text-primary" />
                  GitHub
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/[0.035] p-6">
              <p className="text-sm font-semibold">Before sending a large specification</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                A sample input, current tool list, user recording, or broken spreadsheet
                usually reveals more than a long requirements document.
              </p>
              <Link
                href="/work-with-me"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Review scopes and regional pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
