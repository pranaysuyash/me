import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
    template: "%s | Pranay Suyash",
  },
  description:
    "I turn document-heavy workflows into applied AI systems and fast, usable prototypes. 10+ years across product, engineering, and regulated SaaS.",
  keywords: [
    "Pranay Suyash",
    "Applied AI",
    "Workflow Automation",
    "Document Extraction",
    "Internal Tools",
    "Fast Prototypes",
    "Product Engineering",
    "macOS",
  ],
  authors: [{ name: "Pranay Suyash" }],
  creator: "Pranay Suyash",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranaysuyash.com",
    siteName: "Pranay Suyash",
    title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
    description:
      "I turn document-heavy workflows into applied AI systems and fast, usable prototypes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Suyash | Document AI, Workflow Automation, Fast Prototypes",
    description:
      "I turn document-heavy workflows into applied AI systems and fast, usable prototypes.",
    creator: "@pranaysuyash",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#f8fafc"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
