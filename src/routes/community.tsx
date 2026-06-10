import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { SectionScene3DLazy } from "@/components/brp/SectionScene3DLazy";
import { CommunityExperience } from "@/components/brp/CommunityExperience";
import { communityPage } from "@/data/brp-site-content";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "BRP Group — Our Community" },
      {
        name: "description",
        content: communityPage.heroIntro.slice(0, 160),
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SectionScene3DLazy
        variant="community"
        className="pointer-events-none fixed inset-0 z-[1] opacity-40 mix-blend-normal"
      />
      <ThemeBackdrop variant="page" className="z-[2]" />
      <Nav />
      <div className="relative z-10">
        <CommunityExperience />
      </div>
      <Footer />
    </main>
  );
}
