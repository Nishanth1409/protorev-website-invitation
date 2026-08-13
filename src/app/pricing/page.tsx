import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { PricingTable } from "@/components/commerce/PricingTable";

export const metadata = {
  title: "Pricing — Protorev Digital Invitations",
  description:
    "Startup-friendly pricing for invitation cards and event websites. Templates from ₹99 — made for every family.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--background)] pb-16 pt-8">
        <PricingTable />
      </main>
      <SiteFooter />
    </>
  );
}
