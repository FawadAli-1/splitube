import { auth } from "@clerk/nextjs/server";
import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { NotepadText } from "lucide-react";
import DeleteTest from "@/components/shared/DeleteTest";

const PreviewTestPage = async () => {
  const { userId } = auth();

  try {
    await connectToDb();
    const user = await VideoTestModel.findOne({ userId });
    if (!user) {
      return <div>No tests in progress</div>;
    }
    const {
      videoId,
      titleA,
      descriptionA,
      thumbnailUrlA,
      updatedAt,
      tagsA,
      executeAt,
      titleB,
      descriptionB,
      thumbnailUrlB,
      tagsB,
      isCompleted
    }: {
      videoId: string;
      titleA: string;
      descriptionA: string;
      thumbnailUrlA: string;
      tagsA: string;
      titleB: string;
      descriptionB: string;
      thumbnailUrlB: string;
      tagsB: string;
      updatedAt: Date;
      executeAt: Date;
      isCompleted: boolean
    } = user;
    if(!isCompleted) return <p>No results, wait till test is finished.</p>

    return (
      <section>
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-8">
          Tests in progress
        </h1>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-lg md:text-2xl">
              Test A & Test B (respectively)
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col md:flex-row justify-between mx-12 gap-8 md:gap-0">
            <CardContent className="flex flex-col gap-2 md:w-1/2">
              <h2 className="font-medium text-lg">Title:</h2>
              <p>{titleA}</p>
              <h2 className="font-medium text-lg">Description:</h2>
              <p>{descriptionA}</p>
              <h2 className="font-medium text-lg">Tags:</h2>
              <Badge>{tagsA}</Badge>
              <h2 className="font-medium text-lg">Thumbnail:</h2>
              <Image
                src={thumbnailUrlA}
                alt="Thumbnail A"
                width={1280}
                height={720}
                priority
              />
            </CardContent>
            <CardContent className="flex flex-col gap-2 md:w-1/2">
              <h2 className="font-medium text-lg">Title:</h2>
              <p>{titleB}</p>
              <h2 className="font-medium text-lg">Description:</h2>
              <p>{descriptionB}</p>
              <h2 className="font-medium text-lg">Tags:</h2>
              <Badge>{tagsB}</Badge>
              <h2 className="font-medium text-lg">Thumbnail:</h2>
              <Image
                src={thumbnailUrlB}
                alt="Thumbnail A"
                width={1280}
                height={720}
                priority
              />
            </CardContent>
          </div>
          <CardFooter className="flex flex-col items-start gap-8 mt-6">
            <div className="flex justify-center gap-8">
              <p>
                <span className="font-medium text-lg">Start:</span>{" "}
                {updatedAt.toDateString()}
              </p>
              <p>
                <span className="font-medium text-lg">Finished:</span>{" "}
                {executeAt.toDateString()}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                className={`${cn(
                  buttonVariants({
                    className:
                      "bg-green-600 hover:bg-green-600 hover:opacity-90",
                  })
                )} hover:opacity-90 flex items-center justify-center gap-2`}
                href={`/test-result/${videoId}`}
              >
                <NotepadText className="size-5" />
                Test Results
              </Link>
              <Link
                className={cn(buttonVariants())}
                href={`https://www.youtube.com/watch?v=${videoId}`}
              >
                Video Link
              </Link>
              <DeleteTest/>
            </div>
          </CardFooter>
        </Card>
      </section>
    )

  } catch (error) {
    console.log(error);
  }
};

export default PreviewTestPage;
