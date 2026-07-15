import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Delivery Policy | Pranay Suyash",
  description:
    "How digital files, licence keys, and software access are delivered after purchase from pranaysuyash.com.",
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPage
      eyebrow="Purchase policy"
      title="Digital Delivery Policy"
      summary="Products sold through this site are digital. This page explains when delivery occurs, what the buyer receives, and how to resolve missing or unusable access."
      updated="July 15, 2026"
      sections={[
        {
          title: "Delivery method",
          content: (
            <>
              <p>
                Digital products may be delivered through secure file downloads, email
                access links, licence keys, application downloads, or authenticated
                product access. The applicable method is stated on the product page before
                purchase.
              </p>
              <p>No physical product is shipped.</p>
            </>
          ),
        },
        {
          title: "When delivery occurs",
          content: (
            <p>
              Delivery normally begins immediately after successful payment confirmation.
              Where Dodo Payments is used, checkout confirmation, receipts, and digital
              entitlements may be issued by Dodo Payments as Merchant of Record.
            </p>
          ),
        },
        {
          title: "Buyer responsibilities",
          content: (
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide an accurate email address at checkout.</li>
              <li>Check spam, promotions, quarantine, and filtered folders for delivery messages.</li>
              <li>Use a supported browser, device, operating system, and file reader where requirements are stated.</li>
              <li>Keep order details, access links, files, and licence keys secure.</li>
              <li>Download or activate the product within any access period stated at checkout or in the delivery message.</li>
            </ul>
          ),
        },
        {
          title: "If delivery is missing",
          content: (
            <>
              <p>
                Wait a few minutes after payment, confirm that the payment succeeded, and
                check filtered email folders. If delivery is still unavailable, contact{" "}
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  pranay.suyash@gmail.com
                </Link>{" "}
                with the order email, order or invoice identifier, purchase date, and
                product name.
              </p>
              <p>
                Do not send card numbers, passwords, or sensitive payment credentials.
                Support will verify the order and restore or replace access where
                appropriate.
              </p>
            </>
          ),
        },
        {
          title: "File integrity and access problems",
          content: (
            <p>
              If a delivered file is corrupt, incomplete, or materially different from
              the purchased product, report the issue with the filename, device or reader,
              and any error message. A corrected file, alternate format, or replacement
              access may be provided. Unresolved eligible cases are handled under the{" "}
              <Link
                href="/refund-policy"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Refund Policy
              </Link>
              .
            </p>
          ),
        },
        {
          title: "Updates and future versions",
          content: (
            <p>
              A purchase includes only the files, version, access period, and updates
              explicitly described at the time of purchase. Future editions, major
              upgrades, subscriptions, services, or additional products are not included
              unless the offer states otherwise.
            </p>
          ),
        },
      ]}
    />
  );
}
