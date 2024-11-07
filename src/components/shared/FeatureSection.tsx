import { Check, Pointer, Settings } from "lucide-react";
import Image from "next/image";
import featuredImage from "../../public/images/splittube.png"

const FeatureSection = () => {
  return (
    <section className="px-6 md:px-16 py-12 border-gray-300 border-b">
      <div className="flex flex-col md:flex-row md:justify-around gap-8 md:gap-16 mb-12 md:mb-10 lg:mb-32">
        <div className="text-center md:w-1/3 flex flex-col gap-4 items-center">
          <div className="size-14 bg-gray-300 rounded-2xl flex items-center justify-center">
            <Pointer className="size-8" />
          </div>
          <h2 className="font-bold text-2xl md:text-xl lg:text-3xl">Easy to Use</h2>
          <p className="text-slate-600 text-sm lg:text-base">
            Just a few clicks, and you can configure your a/b testing. Upload
            both thumbnails, titles, descriptions and tags and watch it do the
            rest.
          </p>
        </div>
        <div className="text-center md:w-1/3 flex flex-col gap-4 items-center">
          <div className="size-14 bg-gray-300 rounded-2xl flex items-center justify-center">
            <Check className="size-8" />
          </div>
          <h2 className="font-bold text-2xl md:text-xl lg:text-3xl">Scheduled</h2>
          <p className="text-slate-600 text-sm lg:text-base">
            Your test will be scheduled to run in a 3-days manner. Test A will
            run for 3 days, then test B will run for 3 days. Totalling in 6 day
            testing. After that it will show your results.
          </p>
        </div>
        <div className="text-center md:w-1/3 flex flex-col gap-4 items-center">
          <div className="size-14 bg-gray-300 rounded-2xl flex items-center justify-center">
            <Settings className="size-8" />
          </div>
          <h2 className="font-bold text-2xl md:text-xl lg:text-3xl">
            Youtube API Configured
          </h2>
          <p className="text-slate-600 text-sm lg:text-base">
            Configured with YouTube API to automate the process of changing the
            video details, which are already stored in our database. So you can
            have a smooth UX with clean UI.
          </p>
        </div> 
      </div>
      <div className="flex flex-col-reverse lg:flex-col gap-8 md:gap-8 md:justify-around md:items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-left text-3xl font-bold text-slate-950">
            Youtube Split Testing Made Easy With{" "}
            <span className="text-blue-600 font-extrabold">SplitTubeYT</span>
          </h2>
          <p className="text-slate-600">
            Make your videos perform better by split testing between various
            versions to find out which one is the best, now with SplitTubeYT.
            Create an account and start testing your videos!
          </p>
        </div>
        <div className="border-2">
          <Image
            src={"../../public/images/splittube.png"}
            alt="Features Image"
            width={800}
            height={800}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
