import { copyByLang } from "@/data/invites";
import { faithPresets } from "@/data/faithPresets";
import { musicByMood } from "@/data/music";
import { getCreateTheme, type CreateTheme } from "@/data/themes";
import {
  languageMeta,
  type FaithId,
  type LanguageId,
  type WeddingInvite,
} from "@/data/types";

export type BuildInviteOptions = {
  themeId: string;
  faith: FaithId;
  language: LanguageId;
};

export function buildInviteFromTheme(
  options: BuildInviteOptions,
): WeddingInvite | null {
  const theme = getCreateTheme(options.themeId);
  if (!theme) return null;
  return assembleInvite(theme, options.faith, options.language);
}

export function assembleInvite(
  theme: CreateTheme,
  faith: FaithId,
  language: LanguageId,
): WeddingInvite {
  const preset = faithPresets[faith];
  const localized = preset.byLanguage?.[language] ?? {};
  const lang = languageMeta[language];
  const music = musicByMood[theme.musicMood];

  const bride = localized.bride ?? preset.bride;
  const groom = localized.groom ?? preset.groom;
  const monogram =
    `${bride.trim().charAt(0)}${groom.trim().charAt(0)}`.toUpperCase() ||
    preset.monogram;

  return {
    slug: `preview-${theme.id}-${faith}-${language}`,
    themeId: theme.id,
    faith,
    faithLabel: preset.faithLabel,
    language,
    languageLabel: lang.label,
    regionLabel: localized.regionLabel ?? preset.regionLabel,
    designStyle: theme.designStyle,
    styleLabel: theme.name,
    inviteFormat: theme.format,
    tagline: localized.tagline ?? preset.tagline,
    monogram,
    bride,
    groom,
    weddingDate: preset.weddingDate,
    weddingDateLabel: preset.weddingDateLabel,
    blessingNative: localized.blessingNative ?? preset.blessingNative,
    blessingEnglish: localized.blessingEnglish ?? preset.blessingEnglish,
    hosts: localized.hosts ?? preset.hosts,
    invitationCopy: localized.invitationCopy ?? preset.invitationCopy,
    closingCopy: localized.closingCopy ?? preset.closingCopy,
    location: localized.location ?? preset.location,
    events: localized.events ?? preset.events,
    audioSrc: preset.audioSrc,
    music,
    socials: { whatsapp: "https://wa.me/919999999999" },
    theme: theme.theme,
    coverSubtitle: localized.coverSubtitle ?? copyByLang[language].togetherWith,
    copy: copyByLang[language],
    emblem: preset.emblem,
  };
}

export const allFaithIds: FaithId[] = [
  "hindu",
  "muslim",
  "christian",
  "sikh",
  "jain",
  "interfaith",
];

export const allLanguageIds: LanguageId[] = [
  "en",
  "kn",
  "ta",
  "te",
  "hi",
  "ml",
];
