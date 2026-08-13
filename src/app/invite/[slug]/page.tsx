import { notFound } from "next/navigation";
import { getInvite, invites } from "@/data/invites";
import { InvitationExperience } from "@/components/invite/InvitationExperience";
import { MobileSiteShell } from "@/components/marketing/MobileSiteShell";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return invites.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const invite = getInvite(slug);
  if (!invite) return { title: "Invitation — Protorev Digital" };
  return {
    title: `${invite.bride} & ${invite.groom} — Protorev Digital`,
    description: invite.tagline,
  };
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;
  const invite = getInvite(slug);
  if (!invite) notFound();

  return (
    <MobileSiteShell>
      <InvitationExperience invite={invite} />
    </MobileSiteShell>
  );
}
