import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | Pranay Suyash",
  description:
    "Terms governing use of pranaysuyash.com, digital products, downloadable content, and project enquiries.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      summary="These terms govern use of this site and purchases of digital products offered by Pranay Suyash. Separate project work is governed by its own written agreement."
      updated="July 15, 2026"
      sections={[
        {
          title: "Operator and acceptance",
          content: (
            <>
              <p>
                pranaysuyash.com is operated by Pranay Suyash, an independent creator
                and product builder based in Bengaluru, India.
              </p>
              <p>
                By using the site or purchasing a digital product, you agree to these
                terms and the policies linked from the site. Do not use the site or buy a
                product if you do not agree.
              </p>
            </>
          ),
        },
        {
          title: "Digital products and project work",
          content: (
            <>
              <p>
                Digital products may include ebooks, downloadable files, desktop
                applications, licence keys, templates, or authenticated software access.
                Each product page describes the specific deliverable, price, and access
                model.
              </p>
              <p>
                Consulting, advisory work, and custom product development are not sold as
                standard digital products through Dodo Payments. Any such engagement
                requires a separate written scope, commercial terms, and acceptance.
              </p>
            </>
          ),
        },
        {
          title: "Orders, prices, taxes, and delivery",
          content: (
            <>
              <p>
                Prices and currencies are shown before checkout. Where Dodo Payments is
                used, Dodo acts as Merchant of Record and handles checkout, payment
                processing, applicable taxes, receipts, and related transaction support.
              </p>
              <p>
                An order is complete only after successful payment confirmation. Delivery
                is governed by the{" "}
                <Link
                  href="/delivery-policy"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Delivery Policy
                </Link>
                . Refund requests are governed by the{" "}
                <Link
                  href="/refund-policy"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Refund Policy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          title: "Licence and permitted use",
          content: (
            <>
              <p>
                Unless a product page states otherwise, a purchase grants one buyer a
                limited, non-exclusive, non-transferable licence for personal or internal
                business use.
              </p>
              <p>You may not:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Resell, redistribute, sublicense, publish, or share purchased files or access credentials.</li>
                <li>Remove attribution, copyright notices, licence controls, or technical protections.</li>
                <li>Use the product to create a competing copy or offer substantially the same material for sale.</li>
                <li>Use the site or product for unlawful, abusive, fraudulent, or rights-infringing activity.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Intellectual property",
          content: (
            <p>
              The site, writing, product interfaces, source materials, images, and
              downloadable content are owned by Pranay Suyash or used with permission.
              Purchasing a product transfers a usage licence only. It does not transfer
              copyright, trademarks, source ownership, or other intellectual-property
              rights.
            </p>
          ),
        },
        {
          title: "Information and professional advice",
          content: (
            <p>
              Site content and digital publications are educational and informational.
              They do not constitute legal, medical, financial, tax, accounting, or other
              regulated professional advice. You remain responsible for evaluating and
              testing decisions made using the material in your own context.
            </p>
          ),
        },
        {
          title: "Availability and changes",
          content: (
            <p>
              The site, product descriptions, prices, files, and features may be updated,
              replaced, or withdrawn. Existing purchasers receive only the product,
              version, updates, and support explicitly promised at the time of purchase.
              Continuous availability or future updates are not guaranteed unless stated
              in the offer.
            </p>
          ),
        },
        {
          title: "Disclaimers and limitation",
          content: (
            <>
              <p>
                Products and site content are provided on an as-available basis to the
                extent permitted by law. No guarantee is made that every product will fit
                every workflow, produce a particular commercial result, or operate without
                interruption on every device or environment.
              </p>
              <p>
                To the extent permitted by law, liability arising from a digital-product
                purchase will not exceed the amount paid for that product. This limitation
                does not exclude rights or liabilities that cannot legally be excluded.
              </p>
            </>
          ),
        },
        {
          title: "Governing terms and contact",
          content: (
            <>
              <p>
                These terms are governed by laws applicable to the operator in India,
                subject to mandatory consumer protections that apply in the buyer&apos;s
                location. Transaction terms presented by the Merchant of Record may also
                apply at checkout.
              </p>
              <p>
                Questions can be sent to{" "}
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
      ]}
    />
  );
}
