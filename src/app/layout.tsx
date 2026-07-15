import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pranaysuyash.com/#person",
      name: "Pranay Suyash",
      url: "https://pranaysuyash.com",
      jobTitle: "Product Leader and Hands-on Systems Builder",
      worksFor: {
        "@type": "Organization",
        name: "MedPiper Technologies",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/pranaysuyash",
        "https://www.linkedin.com/in/pranaysuyash",
        "https://x.com/pranaysuyash",
      ],
      knowsAbout: [
        "Product leadership",
        "Product engineering",
        "Operational workflow systems",
        "Document intelligence",
        "Local-first AI",
        "Internal tools",
        "Spatial simulation",
        "AI evaluation and review systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pranaysuyash.com/#website",
      url: "https://pranaysuyash.com",
      name: "Pranay Suyash",
      description:
        "Product leadership and hands-on system building across AI, operational workflows, internal tools, local-first products, and spatial simulation.",
      inLanguage: "en",
      publisher: { "@id": "https://pranaysuyash.com/#person" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pranaysuyash.com"),
  title: "Pranay Suyash | Product Leader and Hands-on Systems Builder",
  description:
    "Product leadership and hands-on system building across AI, operational workflows, internal tools, local-first products, and spatial simulation.",
  authors: [{ name: "Pranay Suyash", url: "https://pranaysuyash.com" }],
  creator: "Pranay Suyash",
  publisher: "Pranay Suyash",
  keywords: [
    "Pranay Suyash",
    "Product Leader",
    "AI Product Lead",
    "Principal Product Manager",
    "Product Systems",
    "Document Workflow Automation",
    "Local-first AI",
    "Internal Tools",
    "Spatial Simulation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranaysuyash.com",
    siteName: "Pranay Suyash",
    title: "Pranay Suyash | Product Leader and Hands-on Systems Builder",
    description: "From ambiguous operational problem to working, reviewable product system.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Suyash | Product Leader and Hands-on Systems Builder",
    description: "AI, workflow, internal tools, local-first products, and spatial systems.",
    creator: "@pranaysuyash",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0d1718" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f8fbfa" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
