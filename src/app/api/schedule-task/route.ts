import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const POST = async (req:Request) => {
  try {
    const cronToken = req.headers.get("x-cron-token");
    const expectedToken = process.env.CRON_SECRET_TOKEN;

    // Verify that the request comes from the cron job using the token
    if (!cronToken || cronToken !== expectedToken) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        {
          status: 401,
        }
      );
    }
    const { userId } = auth();

    await connectToDb();

    const user = await VideoTestModel.findOne({ userId });

    if (!user || !user.testingInProgress) {
      return console.log("No user or testing in progress is false");
    }

    const { titleB, descriptionB, tagsB, thumbnailUrlB, videoId, isCompleted } =
      user;

    const provider = "oauth_google";

    if (isCompleted) {
      try {
        const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
          userId!,
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
      return new Response(
        JSON.stringify({
          success: true,
          message: `Task scheduled for user: ${userId}`,
        }),
        {
          status: 200,
        }
      );
    } else {
      setTimeout(async () => {
        try {
          await VideoTestModel.updateOne({ userId }, { isCompleted: true });
          console.log("isCompleted set to true for user:", userId);
        } catch (error) {
          console.error("Failed to update isCompleted:", error);
        }
      }, 120000);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Task scheduled to be completed for user: ${userId} in 2 minutes`,
        }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to schedule task" }),
      {
        status: 500,
      }
    );
  }
};
