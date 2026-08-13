import { copyByLang } from "@/data/invites";
import { faithPresets } from "@/data/faithPresets";
import { ceremonyPresets } from "@/data/ceremony";
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
  const ceremony = theme.ceremony ?? "wedding";
  const ceremonyPreset = ceremonyPresets[ceremony];
  const preset = faithPresets[faith];
  const localized = preset.byLanguage?.[language] ?? {};
  const lang = languageMeta[language];
  const music = musicByMood[theme.musicMood];
  const copy = { ...copyByLang[language] };

  const useCeremonyPeople = ceremony !== "wedding";

  const bride = useCeremonyPeople
    ? ceremonyPreset.primaryName
    : localized.bride ?? preset.bride;
  const groom = useCeremonyPeople
    ? ceremonyPreset.secondaryName
    : localized.groom ?? preset.groom;
  const monogram =
    `${bride.trim().charAt(0)}${(groom || " ").trim().charAt(0)}`.toUpperCase() ||
    ceremonyPreset.monogram;

  if (useCeremonyPeople) {
    copy.weddingOf = ceremonyPreset.ofLabel;
    copy.youAreInvited = ceremonyPreset.youAreInvited;
    copy.eventsTitle = ceremonyPreset.eventsTitle;
    copy.untilWedding = "Until the celebration";
    copy.meetCouple = "Meet the hosts";
  }

  return {
    slug: `preview-${theme.id}-${faith}-${language}`,
    themeId: theme.id,
    faith,
    faithLabel: useCeremonyPeople
      ? ceremonyPreset.ofLabel.replace(/of$/i, "").trim() || preset.faithLabel
      : preset.faithLabel,
    language,
    languageLabel: lang.label,
    regionLabel: localized.regionLabel ?? preset.regionLabel,
    designStyle: theme.designStyle,
    styleLabel: theme.name,
    inviteFormat: theme.format,
    ceremony,
    ofLabel: ceremonyPreset.ofLabel,
    tagline: useCeremonyPeople
      ? ceremonyPreset.tagline
      : localized.tagline ?? preset.tagline,
    monogram,
    bride,
    groom,
    weddingDate: useCeremonyPeople ? ceremonyPreset.dateIso : preset.weddingDate,
    weddingDateLabel: useCeremonyPeople
      ? ceremonyPreset.dateLabel
      : preset.weddingDateLabel,
    blessingNative: useCeremonyPeople
      ? ceremonyPreset.blessingNative
      : localized.blessingNative ?? preset.blessingNative,
    blessingEnglish: useCeremonyPeople
      ? ceremonyPreset.blessingEnglish
      : localized.blessingEnglish ?? preset.blessingEnglish,
    hosts: useCeremonyPeople
      ? ceremonyPreset.hosts
      : localized.hosts ?? preset.hosts,
    invitationCopy: useCeremonyPeople
      ? ceremonyPreset.invitationCopy
      : localized.invitationCopy ?? preset.invitationCopy,
    closingCopy: useCeremonyPeople
      ? ceremonyPreset.closingCopy
      : localized.closingCopy ?? preset.closingCopy,
    location: useCeremonyPeople
      ? ceremonyPreset.location
      : localized.location ?? preset.location,
    events: useCeremonyPeople
      ? ceremonyPreset.events
      : localized.events ?? preset.events,
    audioSrc: preset.audioSrc,
    music,
    socials: { whatsapp: `https://wa.me/919019726464` },
    theme: theme.theme,
    coverSubtitle: useCeremonyPeople
      ? ceremonyPreset.coverSubtitle
      : localized.coverSubtitle ?? copyByLang[language].togetherWith,
    copy,
    emblem: useCeremonyPeople ? ceremonyPreset.emblem : preset.emblem,
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

export const allLanguageIds: LanguageId[] = ["en", "kn", "ta", "te", "hi", "ml"];
