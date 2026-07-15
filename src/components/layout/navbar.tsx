"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandTagline } from "@/lib/brand";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Experience", href: "/hire-me" },
  { name: "Services", href: "/work-with-me" },
  { name: "Writing", href: "/books/no-claim-without-evidence" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-border/70 shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted/70 text-[13px] font-bold tracking-tight transition-colors group-hover:border-primary/40 group-hover:text-primary">
            PS
          </span>
          <span className="hidden min-w-0 flex-col leading-none xl:flex">
            <span className="name-display text-sm font-semibold text-foreground">Pranay Suyash</span>
            <span className="mt-1 max-w-[300px] truncate text-[10px] uppercase tracking-[0.11em] text-muted-foreground">
              {brandTagline}
            </span>
          </span>
        </Link>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(true)}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden items-center gap-x-3 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary/[0.07] font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-3 border-l pl-4">
            <ThemeToggle />
            <Link
              href="https://github.com/pranaysuyash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="/contact?type=project&source=nav"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Discuss a project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l bg-background px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted text-sm font-bold">PS</span>
                <span>
                  <span className="name-display block text-sm font-semibold">Pranay Suyash</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    Product leader and systems builder
                  </span>
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

            <div className="mt-8 border-b pb-6">
              <Link
                href="/contact?type=project&source=mobile-nav"
                className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Discuss a project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/hire-me"
                className="mt-3 flex w-full items-center justify-center rounded-md border px-4 py-3 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                For hiring teams
              </Link>
            </div>

            <div className="space-y-1 py-6">
              <p className="mb-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Navigation
              </p>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/systems"
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Interactive systems lab
              </Link>
              <Link
                href="/labs"
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Project archive
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
