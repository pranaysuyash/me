"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, BriefcaseBusiness, Github, Menu, Workflow, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandTagline } from "@/lib/brand";
import { noClaimEbook } from "@/lib/ebook";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Workflows", href: "/workflows" },
  { name: "Experience", href: "/hire-me" },
  { name: "Services", href: "/work-with-me" },
  { name: "Book", href: "/books/no-claim-without-evidence" },
  { name: "About", href: "/about" },
];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function primaryAction(pathname: string) {
  if (pathname.startsWith("/hire-me")) {
    return {
      label: "Start role conversation",
      href: "/contact?type=role&source=nav",
      context: "hiring",
      icon: BriefcaseBusiness,
    };
  }

  if (pathname.startsWith("/workflows")) {
    return {
      label: "Discuss selected workflow",
      href: "/contact?type=project&source=nav-workflows",
      context: "services",
      icon: Workflow,
    };
  }

  if (pathname.startsWith("/work-with-me") || pathname.startsWith("/document-workflows")) {
    return {
      label: "Discuss a workflow",
      href: "/contact?type=project&source=nav-services",
      context: "services",
      icon: Workflow,
    };
  }

  if (pathname.startsWith("/books/no-claim-without-evidence")) {
    return {
      label: "Buy the book",
      href: noClaimEbook.checkoutUrl,
      context: "book",
      icon: BookOpen,
    };
  }

  return {
    label: "Choose how to work together",
    href: "/about#ways-to-work",
    context: "choice",
    icon: ArrowRight,
  };
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const action = primaryAction(pathname);
  const ActionIcon = action.icon;
  const actionIsExternal = action.href.startsWith("http");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = menuButtonRef.current;
    const panel = mobilePanelRef.current;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      mobileCloseButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-border/70 shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 lg:px-8" aria-label="Primary navigation">
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
            ref={menuButtonRef}
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

        <div className="hidden items-center gap-x-2 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative rounded-md px-2 py-2 text-sm font-medium transition-colors ${
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
              href={action.href}
              target={actionIsExternal ? "_blank" : undefined}
              rel={actionIsExternal ? "noopener noreferrer" : undefined}
              data-cta-context={action.context}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {action.label} <ActionIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l bg-background px-6 py-6 sm:max-w-sm"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted text-sm font-bold">PS</span>
                  <span>
                    <span className="name-display block text-sm font-semibold">Pranay Suyash</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      Product leader and systems builder
                    </span>
                  </span>
                </Link>
                <button
                  ref={mobileCloseButtonRef}
                  autoFocus
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
                  href={action.href}
                  target={actionIsExternal ? "_blank" : undefined}
                  rel={actionIsExternal ? "noopener noreferrer" : undefined}
                  data-cta-context={action.context}
                  className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
                >
                  {action.label} <ActionIcon className="ml-2 h-4 w-4" />
                </Link>
                {action.context !== "hiring" && (
                  <Link
                    href="/hire-me"
                    className="mt-3 flex w-full items-center justify-center rounded-md border px-4 py-3 text-base font-medium"
                  >
                    For hiring teams
                  </Link>
                )}
                {action.context === "hiring" && (
                  <Link
                    href="/work"
                    className="mt-3 flex w-full items-center justify-center rounded-md border px-4 py-3 text-base font-medium"
                  >
                    Review selected work
                  </Link>
                )}
              </div>

              <div className="space-y-1 py-6">
                <p className="mb-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Navigation
                </p>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/proof"
                  className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Proof ledger
                </Link>
                <Link
                  href="/systems"
                  className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Interactive systems lab
                </Link>
                <Link
                  href="/labs"
                  className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Project archive
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
