"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Work With Me", href: "/work-with-me" },
  { name: "Hire Me", href: "/hire-me" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-md bg-background/95 border-b ${
        scrolled ? "shadow-sm border-border/50" : "border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-[1280px] mx-auto">
        {/* Identity — full name visible on desktop */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Pranay Suyash — home"
          >
            <div className="w-8 h-8 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80">
              <span className="text-sm font-bold tracking-tight text-foreground">
                PS
              </span>
            </div>
            <div className="hidden lg:block">
              <span className="text-sm font-semibold text-foreground tracking-tight">
                Pranay Suyash
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav — Work, Work With Me, Hire Me, About */}
        <div className="hidden lg:flex lg:gap-x-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <ThemeToggle />
            <Link
              href="https://github.com/pranaysuyash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile menu — full name clearly visible */}
        <div
          id="mobile-menu"
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold tracking-tight text-foreground">
                    PS
                  </span>
                </div>
                {/* Full name always visible in mobile menu */}
                <span className="font-semibold text-foreground">
                  Pranay Suyash
                </span>
              </Link>
              <button
                type="button"
                className="rounded-full p-2.5 text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6">
                {/* Primary CTAs — pilot first, hiring second */}
                <div className="py-6 border-b">
                  <p className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Get started
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/work-with-me"
                      className="block w-full text-center rounded-full px-4 py-3 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Work With Me
                    </Link>
                    <Link
                      href="/hire-me"
                      className="block w-full text-center rounded-full px-4 py-3 text-base font-medium border border-input bg-background hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Hire Me
                    </Link>
                  </div>
                </div>

                <div className="space-y-1 py-6">
                  <p className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Navigate
                  </p>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
