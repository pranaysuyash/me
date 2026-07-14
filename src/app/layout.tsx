import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: [
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pranaysuyash.com"),
  title: {
    default: "Pranay Suyash | Product Engineer for AI and Operational Systems",
    template: "%s | Pranay Suyash",
  },
  description:
    "Product engineering for document intelligence, local-first AI tools, operational workflows, and simulation-heavy systems.",
  keywords: [
    "Pranay Suyash",
    "Product Engineer",
    "AI Product Development",
    "Document Intelligence",
    "Local-first AI",
    "Workflow Systems",
    "Spatial Simulation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranaysuyash.com",
    siteName: "Pranay Suyash",
    title: "Pranay Suyash | Product Engineer for AI and Operational Systems",
    description:
      "From unclear operational problem to usable, reviewable product system.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Suyash | Product Engineer for AI and Operational Systems",
    description:
      "Document intelligence, local-first AI, operational workflows, and spatial product systems.",
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
