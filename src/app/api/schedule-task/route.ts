import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { clerkClient } from "@clerk/nextjs/server"; // Don't use auth() since there's no user session

export const POST = async (req) => {
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

    await connectToDb();

    const user = await VideoTestModel.findOne({ testingInProgress: true });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No task found",
        }),
        {
          status: 404,
        }
      );
    }

    const { titleB, descriptionB, tagsB, thumbnailUrlB, videoId, isCompleted, userId } = user;

    const provider = "oauth_google";

    if (isCompleted) {
      try {
        const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
          userId,
          provider
        );

        const accessToken = clerkResponse.data[0].token;

        // Your existing YouTube API logic here...

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
      } catch (error) {
        console.log(error);
        return new Response(
          JSON.stringify({
            success: false,
            message: "YouTube update failed",
          }),
          {
            status: 500,
          }
        );
      }
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
