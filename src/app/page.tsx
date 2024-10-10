import HeroSection from "@/components/shared/HeroSection";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {

  return (
    <>
      <section>
        <SignedIn>
          <HeroSection/>
        </SignedIn>
        <SignedOut>
          <h1>Not logged in...</h1>
        </SignedOut>
      </section>
    </>
  );
}
