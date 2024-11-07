import CommunitySection from "@/components/shared/CommunitySection";
import FeatureSection from "@/components/shared/FeatureSection";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import LandingPage from "@/components/shared/LandingPage";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <section>
        <SignedIn>
          <HeroSection />
        </SignedIn>
        <SignedOut>
          <LandingPage />
          <FeatureSection />
          <TestimonialsSection />
          <CommunitySection />
          <Footer />
        </SignedOut>
      </section>
    </>
  );
}
