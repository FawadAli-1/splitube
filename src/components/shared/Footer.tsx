import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import tiktok from "@/public/images/tiktok-icon.svg";
import { Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-9 md:gap-0 px-6 md:items-center md:justify-around text-slate-600 my-8 md:my-14">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-96">
        <div className="flex flex-col gap-4">
          <h3 className="text-slate-950 font-medium text-xl">
            Join our community
          </h3>
          <div className="flex flex-col gap-2">
            <Link href={"/"}>
              <p className="flex items-center gap-1">
                <InstagramLogoIcon className="size-5" /> Instagram
              </p>
            </Link>
            <Link href={"/"}>
              <p className="flex items-center gap-1">
                <DiscordLogoIcon className="size-5" /> Discord
              </p>
            </Link>
            <Link href={"/"}>
              <p className="flex items-center gap-1">
                <Image src={tiktok} alt="tiktok-icon" width={22} height={22} />{" "}
                Tiktok
              </p>
            </Link>
            <Link href={"/"}>
              <p className="flex items-center gap-1">
                <Youtube className="size-5" /> Youtube
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-slate-950 text-xl font-medium">Navigate to</h3>
          <ul className="flex flex-col gap-4">
            <Link href={"/"}>
              <li>Home</li>
            </Link>
            <Link href={"/about"}>
              <li>About</li>
            </Link>
            <Link href={"/how-to-use"}>
              <li>How to Use?</li>
            </Link>
            <Link href={"/privacy-policy"}>
              <li>Privacy Policy</li>
            </Link>
            <Button>
              <SignInButton>
                <li>Sign Up</li>
              </SignInButton>
            </Button>
          </ul>
        </div>
      </div>
      <div className="mt-4 md:mt-12 lg:mt-20">
        <p>Copyrighted &copy; by SplitTubeYT. All rights reserved. <Link href={"/privacy-policy"} className="text-blue-600">Privacy Policy</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
