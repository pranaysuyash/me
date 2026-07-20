import Link from "next/link";
import type { ReactNode } from "react";
import { CaseMechanismRibbon } from "@/components/case-mechanism-ribbon";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Link href="#main-content" className="skip-link">
        Skip to main content
      </Link>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none">
        {children}
        <CaseMechanismRibbon />
      </main>
      <Footer />
    </div>
  );
}
