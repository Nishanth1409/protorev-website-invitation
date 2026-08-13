import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Invitations",
  description:
    "Live wedding invitation work from Protorev Digital — explore Opening Blessing, then commission yours via WhatsApp.",
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
