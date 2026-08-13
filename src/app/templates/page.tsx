import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { TemplatesGallery } from "@/components/marketing/TemplatesGallery";

export const metadata = {
  title: "Templates — Protorev Digital",
  description: "Browse multi-faith wedding invitation demos by Protorev Digital.",
};

export default function TemplatesPage() {
  return (
    <>
      <SiteHeader />
      <TemplatesGallery />
      <SiteFooter />
    </>
  );
}
