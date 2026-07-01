import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { SectionScene3DLazy } from "@/components/brp/SectionScene3DLazy";
import { CommunityExperience } from "@/components/brp/CommunityExperience";
import { communityPage } from "@/data/brp-site-content";
import { resolveCommunityPage } from "@/lib/cms/about-content";
import { fetchPublicAboutSections } from "@/lib/cms/content.public";

export const Route = createFileRoute("/community")({
  loader: async () => {
    const sections = await fetchPublicAboutSections();
    return resolveCommunityPage(sections);
  },
  head: ({ loaderData }) => {
    const page = loaderData ?? communityPage;
    return {
      meta: [
        { title: `B.R.P. Group - ${page.heroTitle}` },
        {
          name: "description",
          content: page.heroIntro.slice(0, 160),
        },
      ],
    };
  },
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
