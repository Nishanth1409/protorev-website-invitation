import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { COMPANY } from "@/data/contact";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for commissioning digital wedding invitations with Protorev Digital.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#f8f8fc] px-5 py-14 text-[#0f0f1a]">
        <article className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b4aff]">
            Legal
          </p>
          <h1 className="mt-3 font-brand text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-[#4a4a6a]">
            Last updated {new Date().getFullYear()}. These terms apply when you
            commission work from {COMPANY.name}.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#4a4a6a]">
            <section>
              <h2 className="text-base font-semibold text-[#0f0f1a]">
                1. Studio commissions
              </h2>
              <p className="mt-2">
                We design and deliver custom digital wedding invitations
                (including PDF/image cards, invitation websites, and short
                animated videos) as finished studio work. Packages, timelines,
                and scope are confirmed before work begins.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-[#0f0f1a]">
                2. Delivery &amp; tooling
              </h2>
              <p className="mt-2">
                Deliverables are produced and hosted using professional design
                and publishing tools chosen by the studio. Depending on the
                package, this may include third-party website builders or
                hosting platforms (for example, Canva Website or similar
                services). The public marketing site presents finished{" "}
                <strong className="font-semibold text-[#0f0f1a]">
                  live websites
                </strong>{" "}
                as Protorev Digital work; tool names are operational detail, not
                part of the client-facing brand experience.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-[#0f0f1a]">
                3. Samples &amp; previews
              </h2>
              <p className="mt-2">
                Sample invitation websites on this site are demonstrations of
                style and craft. Final commissioned work is unique to each
                celebration and is not a resale of a public template catalog.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-[#0f0f1a]">
                4. Contact
              </h2>
              <p className="mt-2">
                Questions:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-medium text-[#5b4aff]"
                >
                  {COMPANY.email}
                </a>{" "}
                · WhatsApp {COMPANY.phoneDisplay}.
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link href="/" className="text-sm font-semibold text-[#5b4aff]">
              ← Back to home
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
