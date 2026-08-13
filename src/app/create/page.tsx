import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Example invitation cards — Protorev Digital",
  description:
    "Browse wedding invitation card examples. Edit names, faith & language, download PNG/PDF.",
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
