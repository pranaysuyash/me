import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy | Pranay Suyash",
  description:
    "Refund eligibility and request process for digital products purchased from pranaysuyash.com.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Purchase policy"
      title="Refund Policy"
      summary="Digital products are delivered immediately and cannot be returned like physical goods. This policy describes the cases in which a refund may still be appropriate."
      updated="July 15, 2026"
      sections={[
        {
          title: "Refund window",
          content: (
            <p>
              Submit a refund request within 7 calendar days of purchase. Nothing in
              this policy limits refund, cancellation, or consumer rights that cannot be
              excluded under applicable law.
            </p>
          ),
        },
        {
          title: "Eligible reasons",
          content: (
            <>
              <p>A refund may be approved when:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>You were charged more than once for the same order.</li>
                <li>The delivered file or access is corrupt, unusable, or unavailable and the problem cannot be resolved within a reasonable time.</li>
                <li>The product delivered is materially different from the description shown before purchase.</li>
                <li>An unauthorized transaction is confirmed through the payment provider&apos;s review process.</li>
                <li>Applicable law requires a refund.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Normally ineligible reasons",
          content: (
            <>
              <p>
                Except where required by law, refunds are normally not provided solely
                because:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>You changed your mind after receiving working files or access.</li>
                <li>You did not read the product description, system requirements, sample, or stated scope before purchase.</li>
                <li>You expected services, customisation, support, updates, or commercial outcomes that were not included in the offer.</li>
                <li>You purchased the product for an unsupported device, environment, or use case that was disclosed before checkout.</li>
                <li>You breached the licence terms through sharing, resale, redistribution, or other prohibited use.</li>
              </ul>
            </>
          ),
        },
        {
          title: "How to request a refund",
          content: (
            <>
              <p>
                Email{" "}
                <Link
                  href="mailto:pranay.suyash@gmail.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  pranay.suyash@gmail.com
                </Link>{" "}
                with the purchase email, order or invoice identifier, purchase date,
                product name, and a clear description of the problem.
              </p>
              <p>
                Include screenshots or error details when the request concerns delivery,
                file integrity, licence activation, or product access. Do not send card
                numbers, passwords, or other sensitive payment credentials.
              </p>
            </>
          ),
        },
        {
          title: "Review and processing",
          content: (
            <>
              <p>
                Requests are normally reviewed within 5 business days. Reasonable
                troubleshooting or replacement delivery may be offered before a refund
                when that can resolve the issue promptly.
              </p>
              <p>
                Where Dodo Payments processed the purchase, the refund may be issued or
                administered through Dodo Payments as Merchant of Record. Approved refunds
                are returned to the original payment method. Banks and payment networks may
                take additional time to show the funds.
              </p>
            </>
          ),
        },
        {
          title: "Chargebacks and abuse",
          content: (
            <p>
              Contact support before filing a payment dispute so the issue can be
              investigated. Fraudulent refund requests, repeated abuse, or chargebacks
              filed after successful delivery may result in revoked access and evidence
              being supplied to the payment provider.
            </p>
          ),
        },
      ]}
    />
  );
}
