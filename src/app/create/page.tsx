import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Invitations",
  description:
    "Browse Protorev Digital flagship wedding invitation designs. Live preview, then customise via WhatsApp.",
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
