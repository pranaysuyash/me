"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

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
  { name: "Hire Me", href: "/hire-me" },
  { name: "Work With Me", href: "/work-with-me" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link href="/" className="font-bold text-xl gradient-text shrink-0">
              PS
            </Link>
            <p className="text-sm text-muted-foreground">
              Document AI, workflow automation, and product systems.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pranay Suyash &middot; Bengaluru,
            India
          </p>
        </div>
      </div>
    </footer>
  );
}
