import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";
import { MobileSiteShell } from "@/components/marketing/MobileSiteShell";
import { LandingPage } from "@/components/marketing/LandingPage";

export default function Home() {
  return (
    <MobileSiteShell>
      <SiteHeader />
      <LandingPage />
      <SiteFooter />
    </MobileSiteShell>
  );
}
