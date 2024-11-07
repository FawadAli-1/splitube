import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import fawad from "@/public/images/fawad-sqr.jpg";
import Image from "next/image";

const TestimonialsSection = () => {
  return (
    <section className="mt-6 md:mt-12 border-gray-300 border-b pb-6 md:pb-14">
      <h1 className="text-xl md:text-3xl lg:text-4xl text-center font-semibold mb-8">
        What Our Clients Say...
      </h1>
      <Carousel className="w-1/2 m-auto">
        <CarouselContent>
          <CarouselItem className="flex flex-col items-center gap-4">
            <p className="text-2xl border-b pb-8 border-gray-300">
              "The first Youtube split testing app, with the best service."
            </p>
            <Image
              src={fawad}
              alt="Fawad"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="text-sm text-slate-600 text-center md:text-left">
              Fawad Ali, Founder of SplitTubeYT
            </p>
          </CarouselItem>
          <CarouselItem className="flex flex-col items-center gap-4">
            <p className="text-2xl">
              "The first Youtube split testing app, with the best service."
            </p>
            <Image
              src={fawad}
              alt="Fawad"
              width={70}
              height={70}
              className="rounded-full"
            />
            <p className="text-sm text-slate-600">
              Fawad Ali, Founder of SplitTubeYT
            </p>
          </CarouselItem>
          <CarouselItem className="flex flex-col items-center gap-4">
            <p className="text-2xl">
              "The first Youtube split testing app, with the best service."
            </p>
            <Image
              src={fawad}
              alt="Fawad"
              width={70}
              height={70}
              className="rounded-full"
            />
            <p className="text-sm text-slate-600">
              Fawad Ali, Founder of SplitTubeYT
            </p>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default TestimonialsSection;
