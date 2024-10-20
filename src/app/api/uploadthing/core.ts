import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
export const maxDuration = 30
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await currentUser()

      if (!user) throw new UploadThingError("Unauthorized");

     try {
      await connectToDb()
      const userExistsInDb = await VideoTestModel.findOne({userId: user?.id})

      if (userExistsInDb) {
        const { testingInProgress } = userExistsInDb;

        if (testingInProgress) {
          throw new UploadThingError("Only one test allowed per user");
        }
      }
     } catch (error) {
      console.log(error);
     }
 
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata }) => {
 
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;