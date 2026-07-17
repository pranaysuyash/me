import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { brandTagline } from "@/lib/brand";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/pranaysuyash", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/pranaysuyash", icon: Linkedin },
  { name: "X", href: "https://x.com/pranaysuyash", icon: Twitter },
  { name: "Email", href: "mailto:pranay.suyash@gmail.com", icon: Mail },
];

const footerNav = [
  { name: "Work", href: "/work" },
  { name: "Experience", href: "/hire-me" },
  { name: "Services", href: "/work-with-me" },
  { name: "Book", href: "/books/no-claim-without-evidence" },
  { name: "About", href: "/about" },
  { name: "Proof ledger", href: "/proof" },
];

const policyNav = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "JSON Resume", href: "/resume.json" },
  { name: "LLM guide", href: "/llms.txt" },
  { name: "Build identity", href: "/build-info.json" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr_auto]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-sm font-bold">PS</span>
              <span>
                <span className="name-display block font-semibold">Pranay Suyash</span>
                <span className="mt-1 block text-xs text-muted-foreground">{brandTagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Product leadership and hands-on systems for AI and operational workflows.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Portfolio evidence reviewed 16 July 2026.</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3" aria-label="Footer navigation">
            {footerNav.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4 lg:justify-end">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="text-muted-foreground transition-colors hover:text-primary"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 border-t pt-6 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Pranay Suyash · Bengaluru, India
            </p>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">
              Dodo is Merchant of Record for ebooks. Custom engagements may contract through PSRS Technologies Private Limited.
            </p>
          </div>

          <nav className="flex max-w-2xl flex-wrap gap-x-5 gap-y-2 md:justify-end" aria-label="Policies and machine-readable resources">
            {policyNav.map((item) => {
              const staticAsset = /\.(?:json|txt)$/.test(item.href);
              const className = "text-xs text-muted-foreground transition-colors hover:text-primary";
              return staticAsset ? (
                <a key={item.name} href={item.href} className={className}>
                  {item.name}
                </a>
              ) : (
                <Link key={item.name} href={item.href} className={className}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
