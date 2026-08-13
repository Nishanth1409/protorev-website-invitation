import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ themeId: string }>;
};

/** Demo theme previews removed — only live Opening Blessing work remains. */
export default async function ThemePreviewPage({ params }: Props) {
  await params;
  redirect("/create");
}
