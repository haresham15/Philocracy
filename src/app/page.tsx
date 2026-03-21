import { Hero } from "@/components/Hero";
import { LiveImpact } from "@/components/LiveImpact";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MissionSection } from "@/components/MissionSection";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveImpact />
      <FeaturedProducts />
      <MissionSection />
    </>
  );
}
