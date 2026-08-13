"use client";

import type { ReactNode } from "react";
import type { WeddingInvite } from "@/data/types";
import { getCreateTheme } from "@/data/themes";
import { galleryPresentation } from "@/data/galleryPresentation";
import {
  customizeEmailUrl,
  customizeWhatsAppUrl,
} from "@/data/contact";
import { languageMeta } from "@/data/types";
import { MobilePreviewPage } from "@/components/marketing/MobilePreviewPage";
import { CinematicExperience } from "./CinematicExperience";
import { ArtDirectedWebsite } from "./art/ArtDirectedWebsite";
import { getArtDirection, isArtDirectedTheme } from "@/data/artDirection";
import { PrintableInvitationCard } from "./PrintableInvitationCard";
import { RoyalNightStyle } from "./styles/RoyalNightStyle";
import { GardenBloomStyle } from "./styles/GardenBloomStyle";
import { ModernCleanStyle } from "./styles/ModernCleanStyle";
import { CoastalMistStyle } from "./styles/CoastalMistStyle";
import { FestivalBrightStyle } from "./styles/FestivalBrightStyle";
import { LuxeMarbleStyle } from "./styles/LuxeMarbleStyle";

type Props = {
  invite: WeddingInvite;
  /** Hide duplicate title when ThemeStudio already shows chrome */
  hidePageHeader?: boolean;
};

/**
 * All theme previews render inside a mobile phone frame only.
 */
export function InvitationExperience({
  invite,
  hidePageHeader = false,
}: Props) {
  const theme = invite.themeId ? getCreateTheme(invite.themeId) : null;
  const format = invite.inviteFormat ?? theme?.format;
  const pres = theme ? galleryPresentation(theme) : null;
  const langLabel = languageMeta[invite.language].label;

  const wa = customizeWhatsAppUrl({
    themeName: pres?.title ?? invite.styleLabel,
    format: format ?? "invitation-card",
    faith: invite.faithLabel,
    languages: langLabel,
    bride: invite.bride,
    groom: invite.groom,
  });
  const mail = customizeEmailUrl({
    themeName: pres?.title ?? invite.styleLabel,
    format: format ?? "invitation-card",
    bride: invite.bride,
    groom: invite.groom,
  });

  let inner: ReactNode;

  if (format === "invitation-card" && theme) {
    const art = getArtDirection(theme.id);
    const stageBg = art?.palette.shellDeep ?? "#1a1210";
    inner = (
      <div
        className="mobile-card-stage flex min-h-full items-start justify-center px-2 pb-8 pt-6"
        style={{ background: stageBg }}
      >
        <div className="w-full max-w-[100%] [&_[data-invite-card]]:!max-w-none">
          <PrintableInvitationCard invite={invite} watermarked={false} />
        </div>
      </div>
    );
  } else if (theme) {
    inner = (
      <div className="invite-mobile-canvas min-h-full">
        {isArtDirectedTheme(theme.id) ? (
          <ArtDirectedWebsite invite={invite} />
        ) : (
          <CinematicExperience invite={invite} experience={theme.experience} />
        )}
      </div>
    );
  } else {
    inner = (
      <div className="invite-mobile-canvas min-h-full">
        <LegacyStyle invite={invite} />
      </div>
    );
  }

  return (
    <MobilePreviewPage
      themeName={pres?.title ?? invite.styleLabel}
      subtitle={`${invite.faithLabel} · ${langLabel}`}
      whatsAppHref={wa}
      emailHref={mail}
      hidePageHeader={hidePageHeader}
    >
      {inner}
    </MobilePreviewPage>
  );
}

function LegacyStyle({ invite }: { invite: WeddingInvite }) {
  switch (invite.designStyle) {
    case "garden-bloom":
      return <GardenBloomStyle invite={invite} />;
    case "modern-clean":
      return <ModernCleanStyle invite={invite} />;
    case "coastal-mist":
      return <CoastalMistStyle invite={invite} />;
    case "festival-bright":
      return <FestivalBrightStyle invite={invite} />;
    case "luxe-marble":
      return <LuxeMarbleStyle invite={invite} />;
    case "royal-night":
    default:
      return <RoyalNightStyle invite={invite} />;
  }
}
