import { notFound, redirect } from "next/navigation";
import { createThemes, getCreateTheme } from "@/data/themes";

type Props = {
  params: Promise<{ themeId: string }>;
  searchParams: Promise<{ faith?: string; lang?: string }>;
};

/** Public preview URLs — same pattern as studio “Preview theme”. */
export function generateStaticParams() {
  return createThemes.map((t) => ({ themeId: t.id }));
}

export async function generateMetadata({ params }: Props) {
  const { themeId } = await params;
  const theme = getCreateTheme(themeId);
  if (!theme) return { title: "Preview — Protorev Digital" };
  return {
    title: `Preview · ${theme.name} — Protorev Digital`,
    description: theme.blurb,
  };
}

export default async function DemoPreviewPage({ params, searchParams }: Props) {
  const { themeId } = await params;
  const sp = await searchParams;
  const theme = getCreateTheme(themeId);
  if (!theme) notFound();

  const q = new URLSearchParams();
  if (sp.faith) q.set("faith", sp.faith);
  if (sp.lang) q.set("lang", sp.lang);
  const suffix = q.toString() ? `?${q.toString()}` : "";
  redirect(`/create/${theme.id}${suffix}`);
}
