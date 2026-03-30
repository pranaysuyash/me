"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerNav = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Hire Me", href: "/hire-me" },
  { name: "Contact", href: "/contact" },
];

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

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="font-bold text-2xl gradient-text">
              PS
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Applied AI builder. I ship working software for teams who need
              momentum, not decks.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
                Navigate
              </p>
              <nav className="flex flex-col gap-2">
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
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pranay Suyash
          </p>
          <p className="text-xs text-muted-foreground">Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
}
