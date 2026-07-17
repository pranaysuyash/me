import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Pranay Suyash",
  description:
    "How pranaysuyash.com collects, uses, shares, and protects information submitted through the site, scheduling tools, and digital-product checkout.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      summary="This policy explains what information is collected through pranaysuyash.com, why it is used, and which service providers may process it."
      updated="July 17, 2026"
      sections={[
        {
          title: "Who operates this site",
          content: (
            <>
              <p>
                This site is operated by Pranay Suyash, an independent creator and
                product builder based in Bengaluru, India.
              </p>
              <p>
                Privacy questions can be sent to{" "}
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  pranay.suyash@gmail.com
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          title: "Information collected",
          content: (
            <>
              <p>
                The site may collect information that you provide directly,
                including:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Name, email address, company, website, role or project details,
                  timeline, and budget range submitted through the contact form.
                </li>
                <li>
                  Scheduling information you provide when booking a call.
                </li>
                <li>
                  Order, billing, tax, payment, and fulfilment information required
                  to purchase a digital product.
                </li>
                <li>Messages and support requests sent by email.</li>
              </ul>
              <p>
                Hosting and service providers may also process basic technical data
                such as IP address, browser type, device information, timestamps,
                security events, and request logs.
              </p>
            </>
          ),
        },
        {
          title: "Analytics, cookies, and local preferences",
          content: (
            <>
              <p>
                The site does not currently use advertising cookies, behavioural
                profiling, third-party analytics, tracking pixels, session replay,
                or cross-site advertising technology.
              </p>
              <p>
                Small preference values may be stored in your browser so the site
                can remember light or dark appearance and an India or Global pricing
                selection. These values remain on your device and are used only to
                preserve the interface choice you made.
              </p>
              <p>
                Links to Cal.com include standard campaign parameters identifying
                this site, the role or commercial booking path, and the selected call
                length. Cal.com may store those parameters with a completed booking
                so aggregate professional outcomes can be counted. The parameters do
                not contain your name, email address, message, or a history of pages
                viewed on this site.
              </p>
              <p>
                Cloudflare and other infrastructure providers may maintain security
                and request logs as part of hosting, abuse prevention, reliability,
                and incident response.
              </p>
            </>
          ),
        },
        {
          title: "How information is used",
          content: (
            <ul className="list-disc space-y-2 pl-6">
              <li>
                To respond to hiring, advisory, project, support, and general
                enquiries.
              </li>
              <li>
                To schedule calls, distinguish role and commercial booking paths,
                and communicate about requested work.
              </li>
              <li>
                To process digital-product purchases, deliver files or access,
                provide receipts, and handle support or refund requests.
              </li>
              <li>
                To protect the site, prevent abuse or fraud, and diagnose technical
                problems.
              </li>
              <li>
                To comply with applicable legal, accounting, tax, and regulatory
                obligations.
              </li>
            </ul>
          ),
        },
        {
          title: "Service providers",
          content: (
            <>
              <p>
                The site relies on third-party providers that process information for
                specific purposes. These may include Cloudflare for hosting and
                security, FormBold for contact-form delivery, Cal.com for scheduling
                and booking-path attribution, and Dodo Payments for checkout, payment
                processing, taxes, receipts, refunds, and digital-product fulfilment
                where enabled.
              </p>
              <p>
                Those providers process data under their own terms and privacy
                policies. Personal information is not sold to advertisers or data
                brokers.
              </p>
            </>
          ),
        },
        {
          title: "Retention and security",
          content: (
            <>
              <p>
                Information is retained only for as long as reasonably necessary to
                respond, deliver a product or engagement, maintain records, resolve
                disputes, prevent abuse, and meet legal obligations.
              </p>
              <p>
                Reasonable technical and organisational safeguards are used, but no
                internet transmission or storage system can be guaranteed completely
                secure.
              </p>
            </>
          ),
        },
        {
          title: "Your choices and rights",
          content: (
            <>
              <p>
                You may ask to access, correct, or delete personal information held
                directly by the site, subject to legal and record-keeping
                requirements. You may also object to or restrict certain processing
                where applicable.
              </p>
              <p>
                Requests should include enough information to identify the relevant
                enquiry or transaction. Payment and scheduling providers may need to
                handle requests relating to data held in their systems.
              </p>
              <p>
                You can clear locally stored appearance or pricing preferences
                through your browser&apos;s site-data controls at any time.
              </p>
            </>
          ),
        },
        {
          title: "International processing and updates",
          content: (
            <>
              <p>
                Service providers may process information in countries other than
                your own. By using the site, you understand that information may be
                transferred and processed where those providers operate, subject to
                applicable law.
              </p>
              <p>
                This policy may be updated when the site, providers, products, or
                legal obligations change. The current version and update date will
                remain available on this page.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
