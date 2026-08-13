import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ themeId: string }>;
};

/** Demo theme previews removed — send visitors to live work only. */
export default async function DemoPreviewPage({ params }: Props) {
  await params;
  redirect("/create");
}
