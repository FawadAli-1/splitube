import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import schedule from "node-schedule";

const userTasks = {}; 

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ success: false, message: "User not logged in" }), {
        status: 401,
      });
    }

    await connectToDb();

    const user = await VideoTestModel.findOne({ userId });

    if (!user || !user.testingInProgress) {
      return new Response(JSON.stringify({ success: false, message: "No task found for the user" }), {
        status: 404,
      });
    }

    const { titleB, descriptionB, tagsB, thumbnailUrlB, videoId } = user;

    const provider = "oauth_google";

    const task = schedule.scheduleJob(Date.now() + 120000, async () => {
      try {
        const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
          userId,
          provider
        );

        const accessToken = clerkResponse.data[0].token;

        const youtubeVideoUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics`;

        const youtubeResponse = await fetch(youtubeVideoUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: videoId,
            snippet: {
              categoryId: 20,
              defaultLanguage: "en",
              description: descriptionB,
              title: titleB,
              tags: tagsB,
            },
          }),
        });

        const youtubeThumbnailUrl = `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${videoId}`;

        const thumbnailResponse = await fetch(thumbnailUrlB);
        const thumbnailBlob = await thumbnailResponse.blob();

        const formData = new FormData();
        formData.append("media", thumbnailBlob);

        const youtubeThumbnail = await fetch(youtubeThumbnailUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!youtubeThumbnail.ok) {
          console.error(
            `YouTube API Error: ${youtubeThumbnail.status} - ${youtubeThumbnail.statusText}`
          );
          return;
        }

        if (!youtubeResponse.ok) {
          console.error(
            `YouTube API Error: ${youtubeResponse.status} - ${youtubeResponse.statusText}`
          );
          const errorText = await youtubeResponse.text();
          console.error("YouTube API Error Response:", errorText);
          return;
        }
      } catch (error) {
        console.log(error);
      }

      console.log("Task execution completed");
      task.cancel(); // Cancel the task once it has run
      delete userTasks[userId]; // Remove the task from the tracking object
    });

    userTasks[userId] = task; // Track the task

    return new Response(JSON.stringify({ success: true, message: `Task scheduled for user: ${userId}` }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: "Failed to schedule task" }), {
      status: 500,
    });
  }
};
