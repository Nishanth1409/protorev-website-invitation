import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Theme gallery — Protorev Digital",
  description:
    "Browse wedding invitation themes. WhatsApp us to customise — we design and deliver. No login or self-download.",
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
