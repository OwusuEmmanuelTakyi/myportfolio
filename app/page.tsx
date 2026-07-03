import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyWorkWithMe } from "@/components/home/WhyWorkWithMe";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GamesTeaser } from "@/components/home/GamesTeaser";
import { FeaturedBlog } from "@/components/home/FeaturedBlog";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturedProjects />
      <WhyWorkWithMe />
      <TechMarquee />
      <ProcessSection />
      <GamesTeaser />
      <FeaturedBlog />
      <CTASection />
    </>
  );
}
