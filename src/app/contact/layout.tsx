import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discuss a Project | Pranay Suyash",
  description:
    "Send a project brief for an AI-assisted product, operational system, local-first tool, document workflow, or spatial simulation build.",
  openGraph: {
    title: "Discuss a Project | Pranay Suyash",
    description:
      "Start with the current workflow, its failure point, and what a useful system would change.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
