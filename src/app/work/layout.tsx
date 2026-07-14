import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work | Pranay Suyash",
  description:
    "Flagship product systems and technical work across document intelligence, local-first AI, operational workflows, and spatial simulation.",
  openGraph: {
    title: "Selected Work | Pranay Suyash",
    description:
      "Case studies organized by commercial proof, system depth, and technical range.",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
