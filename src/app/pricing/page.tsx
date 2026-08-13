import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { MobileSiteShell } from "@/components/marketing/MobileSiteShell";
import { PricingTable } from "@/components/commerce/PricingTable";

export const metadata = {
  title: "Pricing — Protorev Digital Invitations",
  description:
    "Custom invitation packages — browse themes, WhatsApp us to order. We design and deliver.",
};

export default function PricingPage() {
  return (
    <MobileSiteShell>
      <SiteHeader />
      <main className="bg-[var(--background)] pb-16 pt-8">
        <PricingTable />
      </main>
      <SiteFooter />
    </MobileSiteShell>
  );
}
