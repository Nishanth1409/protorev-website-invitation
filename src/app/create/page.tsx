import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { CreateHub } from "@/components/marketing/CreateHub";

export const metadata = {
  title: "Create Invitation — Protorev Digital",
  description:
    "Choose invitation card or event page themes. Every design works across all faiths and languages.",
};

export default function CreatePage() {
  return (
    <>
      <SiteHeader />
      <CreateHub />
      <SiteFooter />
    </>
  );
}
