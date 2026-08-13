"use client";

import type { WeddingInvite } from "@/data/types";
import { getCreateTheme } from "@/data/themes";
import { CinematicExperience } from "./CinematicExperience";
import { InvitationCardExperience } from "./InvitationCardExperience";
import { RoyalNightStyle } from "./styles/RoyalNightStyle";
import { GardenBloomStyle } from "./styles/GardenBloomStyle";
import { ModernCleanStyle } from "./styles/ModernCleanStyle";
import { CoastalMistStyle } from "./styles/CoastalMistStyle";
import { FestivalBrightStyle } from "./styles/FestivalBrightStyle";
import { LuxeMarbleStyle } from "./styles/LuxeMarbleStyle";

type Props = {
  invite: WeddingInvite;
};

/**
 * Cards → printable Canva-style export experience.
 * Event pages → full scrolling website experience.
 */
export function InvitationExperience({ invite }: Props) {
  const theme = invite.themeId ? getCreateTheme(invite.themeId) : null;
  const format = invite.inviteFormat ?? theme?.format;

  if (format === "invitation-card" && theme) {
    return <InvitationCardExperience invite={invite} />;
  }

  if (theme) {
    return (
      <CinematicExperience invite={invite} experience={theme.experience} />
    );
  }

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
