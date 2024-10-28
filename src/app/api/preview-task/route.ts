import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const GET = async () => {
  const { userId } = auth();
  const provider = "oauth_google";

  try {
    await connectToDb();

    // Get OAuth access token from Clerk
    const clerkResponse = await clerkClient().users.getUserOauthAccessToken(userId!, provider);
    const accessToken = clerkResponse.data[0].token;

    const user = await VideoTestModel.findOne({ userId });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not testing currently" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const { executeAt } = user;

    const formatDateToYYYYMMDD = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const getThreeDaysBefore = (date: Date) => {
      const threeDaysBefore = new Date(date);
      threeDaysBefore.setDate(date.getDate() - 3);
      return formatDateToYYYYMMDD(threeDaysBefore);
    };

    const endDateForTestOne = formatDateToYYYYMMDD(executeAt);
    const startDateForTestOne = getThreeDaysBefore(executeAt);

    const youtubeAnalyticsTestA = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&endDate=${endDateForTestOne}&startDate=${startDateForTestOne}&metrics=likes,subscribersGained,viewerPercentage,views,estimatedMinutesWatched,averageViewDuration`;

    const youtubeTestOneResponse = await fetch(youtubeAnalyticsTestA, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const youtubeTestOne = await youtubeTestOneResponse.json();

    return new Response(
      JSON.stringify(youtubeTestOne),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
