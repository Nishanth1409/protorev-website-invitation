import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { PricingTable } from "@/components/commerce/PricingTable";

export const metadata = {
  title: "Packages & pricing",
  description:
    "Affordable custom wedding invitations — PDF & image, invitation website, and handcrafted animated invite videos. Commission via WhatsApp with Protorev Digital.",
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
