import { notFound } from "next/navigation";
import { createThemes, getCreateTheme } from "@/data/themes";
import { ThemeStudio } from "@/components/marketing/ThemeStudio";
import type { FaithId, LanguageId } from "@/data/types";
import { allFaithIds, allLanguageIds } from "@/lib/buildInvite";

type Props = {
  params: Promise<{ themeId: string }>;
  searchParams: Promise<{
    faith?: string;
    lang?: string;
    langs?: string;
    ready?: string;
  }>;
};

export function generateStaticParams() {
  return createThemes.map((t) => ({ themeId: t.id }));
}

export async function generateMetadata({ params }: Props) {
  const { themeId } = await params;
  const theme = getCreateTheme(themeId);
  if (!theme) return { title: "Theme — Protorev Digital" };
  return {
    title: `${theme.name} — Create Invitation | Protorev Digital`,
    description: theme.blurb,
  };
}

function parseLanguages(sp: {
  lang?: string;
  langs?: string;
}): LanguageId[] {
  const fromList = (sp.langs ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is LanguageId =>
      allLanguageIds.includes(s as LanguageId),
    );
  if (fromList.length) return fromList;
  if (sp.lang && allLanguageIds.includes(sp.lang as LanguageId)) {
    return [sp.lang as LanguageId];
  }
  return ["en"];
}

export default async function ThemePreviewPage({ params, searchParams }: Props) {
  const { themeId } = await params;
  const sp = await searchParams;
  const theme = getCreateTheme(themeId);
  if (!theme) notFound();

  const hasFaith = allFaithIds.includes(sp.faith as FaithId);
  const faith = (hasFaith ? sp.faith : "hindu") as FaithId;
  const languages = parseLanguages(sp);
  const activeLanguage =
    sp.lang && languages.includes(sp.lang as LanguageId)
      ? (sp.lang as LanguageId)
      : languages[0];
  const startReady = sp.ready === "1" && hasFaith && languages.length > 0;

  return (
    <ThemeStudio
      theme={theme}
      initialFaith={faith}
      initialLanguages={languages}
      initialActiveLanguage={activeLanguage}
      startReady={startReady}
    />
  );
}
