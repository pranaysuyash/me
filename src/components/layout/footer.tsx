"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { brandTagline } from "@/lib/brand";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/pranaysuyash", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/pranaysuyash",
    icon: Linkedin,
  },
  { name: "X", href: "https://x.com/pranaysuyash", icon: Twitter },
  { name: "Email", href: "mailto:pranay.suyash@gmail.com", icon: Mail },
];

const footerNav = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/work-with-me" },
  { name: "About", href: "/about" },
  { name: "Writing", href: "/books/no-claim-without-evidence" },
  { name: "Experience", href: "/hire-me" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-[1280px] px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Link href="/" className="shrink-0 text-xl font-bold gradient-text">
              PS
            </Link>
            <p className="text-sm text-muted-foreground">{brandTagline}.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pranay Suyash &middot; Bengaluru, India
          </p>
          <p className="text-xs text-muted-foreground">
            Available for selected global and India-based product engagements.
          </p>
        </div>
      </div>
    </footer>
  );
}
