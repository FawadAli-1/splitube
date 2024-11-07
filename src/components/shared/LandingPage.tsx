import Image from "next/image";
import heroImage from "@/public/images/hero-image.png";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row lg:items-center gap-6 md:gap-16 lg:gap-0 mt-12 text-slate-950 border-b border-gray-300 pb-12 lg:pb-28 px-6 lg:px-16">
      <div className="lg:w-1/3 flex flex-col md:items-center lg:items-start gap-4 lg:gap-8">
        <h1 className="font-extrabold text-2xl md:text-3xl lg:text-4xl">
          Split Test Youtube Videos, <br />{" "}
          <span className="text-blue-600"> On The Go!</span>
        </h1>
        <p className="font-medium">
          Get more views, likes, shares and more using{" "}
          <span className="text-blue-600 font-bold">SplitTubeYT</span>. <br />{" "}
          Split Test Youtube Videos For Best Performance.
        </p>

        <div className="flex flex-col md:w-1/2 lg:flex-row gap-2">
          <Button size={"lg"} className="rounded-3xl">
            <SignInButton> Get Started</SignInButton>
          </Button>
          <Button
            size={"lg"}
            className="bg-transparent text-slate-950 border-2 border-gray-500 rounded-3xl hover:bg-gray-500 hover:text-slate-50"
          >
            <Link href={"/about"}>
            Learn More
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={heroImage}
          alt="Hero Image"
          width={900}
          height={800}
          priority
        />
      </div>
    </section>
  );
};

export default LandingPage;
