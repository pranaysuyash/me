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
  title: {
    default: "Pranay Suyash | Product · Document AI · YC S20",
    template: "%s | Pranay Suyash",
  },
  description:
    "I build document extraction tools that cut insurance processing from 4 weeks to 10 days. 14 years shipping product, most recently at MedPiper (YC S20).",
  keywords: [
    "Pranay Suyash",
    "Document AI",
    "Product Builder",
    "Workflow Automation",
    "YC S20",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pranaysuyash.com",
    siteName: "Pranay Suyash",
    title: "Pranay Suyash | Product · Document AI · YC S20",
    description:
      "I build document extraction tools that cut insurance processing from 4 weeks to 10 days. 14 years shipping product.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Suyash | Product · Document AI · YC S20",
    description:
      "I build document extraction tools that cut insurance processing from 4 weeks to 10 days. 14 years shipping product.",
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
