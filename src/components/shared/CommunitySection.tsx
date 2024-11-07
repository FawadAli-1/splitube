import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import tiktok from "@/public/images/tiktok-icon.svg";
import { Youtube } from "lucide-react";
import Link from "next/link";

const CommunitySection = () => {
  return (
    <section className="flex flex-col items-center mt-6 md:mt-14 border-b border-gray-300 pb-8 md:pb-16">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl">Join Our Community</h2>
        <p className="px-6">
          Join our communities below, so we can contact you directly and you can
          have conversations, give feedbacks and tell us what features to add.
        </p>
      </div>
      <div className="text-slate-600 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 border-y border-gray-300 py-4 mt-4">
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
    </section>
  );
};

export default CommunitySection;
