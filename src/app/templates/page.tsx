import { redirect } from "next/navigation";

export const metadata = {
  title: "Invitation gallery",
  description:
    "Live wedding invitation work from Protorev Digital.",
};

export default function TemplatesPage() {
  redirect("/create");
}
