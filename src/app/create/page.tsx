import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Theme gallery",
  description:
    "Browse multi-faith wedding invitation themes. Preview on mobile, then commission customisation via WhatsApp.",
};

export default function CreatePage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <CreateHub />
      </Suspense>
      <SiteFooter />
    </>
  );
}
