import { redirect } from "next/navigation";

export const metadata = {
  title: "Invitation gallery",
  description:
    "Browse premium wedding invitation cards and guest websites by Protorev Digital.",
};

export default function TemplatesPage() {
  redirect("/create?format=invitation-card");
}
