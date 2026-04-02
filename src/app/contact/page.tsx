"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const FORMBOLD_ENDPOINT = "https://formbold.com/s/6QZJn";
const CAL_15MIN = "https://cal.com/pranaysuyash/15min";
const CAL_30MIN = "https://cal.com/pranaysuyash/30min";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"call" | "project">("call");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(FORMBOLD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          formData as Record<string, string>,
        ).toString(),
      });
      if (!response.ok) throw new Error("Something went wrong.");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
        honeypot: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <PageLayout>
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose how you&apos;d like to connect.
            </p>
          </div>

          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("call")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === "call"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-primary"
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Book a Call
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("project")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === "project"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-primary"
              }`}
            >
              <Send className="h-4 w-4 inline mr-2" />
              Tell Me About Your Project
            </button>
          </div>

          {activeTab === "call" ? (
            <div className="border rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-3">Book a call</h2>
              <p className="text-muted-foreground mb-6">
                Pick a time that works for you. No pressure, no pitch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={CAL_15MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <Calendar className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">15-minute call</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quick intro to discuss your needs
                  </p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    Book now <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </a>
                <a
                  href={CAL_30MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <Calendar className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">30-minute call</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Deep dive into your project
                  </p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    Book now <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border rounded-xl p-8 space-y-5"
            >
              <h2 className="text-xl font-semibold mb-1">
                Tell me about your project
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                I&apos;ll send a proposal within 48 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="project-name"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="project-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="project-email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="project-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select range</option>
                    <option value="<5K">Under $5K</option>
                    <option value="5-10K">$5K - $10K</option>
                    <option value="10-25K">$10K - $25K</option>
                    <option value="25K+">$25K+</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-message"
                  className="block text-sm font-medium mb-1.5"
                >
                  Tell me about your project{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="project-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you building? What problem are you solving? What's your timeline?"
                  required
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
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
                className="w-full rounded-full"
                size="lg"
              >
                {status === "loading" ? "Sending..." : "Send Project Inquiry"}
                <Send className="ml-2 h-4 w-4" />
              </Button>

              {status === "success" && (
                <p className="text-sm text-green-600 dark:text-green-400 text-center">
                  Thank you! Your message has been sent. I&apos;ll respond
                  within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive text-center">
                  {errorMessage}
                </p>
              )}
            </form>
          )}

          <div className="mt-12 border rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Or reach me directly
            </h3>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:pranay.suyash@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  pranay.suyash@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+91 99104 03502</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/pranaysuyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
