import type { Metadata } from "next";
import { OpeningBlessingPage } from "@/components/showcase/OpeningBlessingInvite";

export const metadata: Metadata = {
  title: "Opening Blessing · Custom Work",
  description:
    "A Protorev Digital custom wedding invitation website — designed uniquely for one celebration.",
  robots: { index: false, follow: false },
};

export default function ShowcaseOpeningBlessingPage() {
  return <OpeningBlessingPage />;
}
