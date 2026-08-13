import { redirect } from "next/navigation";

export const metadata = {
  title: "Example cards — Protorev Digital",
  description: "Browse wedding invitation card examples — edit and download PNG/PDF.",
};

export default function TemplatesPage() {
  redirect("/create?format=invitation-card");
}
