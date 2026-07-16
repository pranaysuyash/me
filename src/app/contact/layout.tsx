import type { Metadata } from "next";

const title = "Start a Conversation | Pranay Suyash";
const description =
  "Share a senior product role or a workflow, internal-tool, document, desktop, or spatial-system project.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://pranaysuyash.com/contact",
  },
  openGraph: {
    title,
    description,
    url: "https://pranaysuyash.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <noscript>
        <div className="border-b bg-amber-50 px-4 py-3 text-center text-sm text-amber-950">
          The enquiry form needs JavaScript. Email{" "}
          <a className="font-semibold underline underline-offset-4" href="mailto:pranay.suyash@gmail.com">
            pranay.suyash@gmail.com
          </a>{" "}
          instead.
        </div>
      </noscript>
      {children}
    </>
  );
}
