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

    const showPreviewDate = new Date(executeAt.getTime() + 3 * 24 * 60 * 60 * 1000);

    if(showPreviewDate){
      const formatDateToYYYYMMDD = (date:Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      const getDateRange = (date : Date, offsetDays : number) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() - offsetDays);
        return formatDateToYYYYMMDD(adjustedDate);
      };

      const testTwoEndingDate = (date : Date, offsetDays : number) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() + offsetDays);
        return formatDateToYYYYMMDD(adjustedDate);
      };
  
      // Define date ranges for the two analytics calls
      const startDateForTestOne = getDateRange(executeAt, 3);
      const endDateForTestOne = formatDateToYYYYMMDD(executeAt);
  
      const startDateForTestTwo = formatDateToYYYYMMDD(executeAt)
      const endDateForTestTwo = testTwoEndingDate(executeAt, 3);
  
      const fetchYouTubeAnalytics = async (startDate : string, endDate: string) => {
        const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&endDate=${endDate}&startDate=${startDate}&metrics=likes,subscribersGained,averageViewPercentage,views,estimatedMinutesWatched,averageViewDuration`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.json();
      };
  
      // Call analytics with two different date ranges
      const [youtubeTestOne, youtubeTestTwo] = await Promise.all([
        fetchYouTubeAnalytics(startDateForTestOne, endDateForTestOne),
        fetchYouTubeAnalytics(startDateForTestTwo, endDateForTestTwo),
      ]);
  
      return new Response(
        JSON.stringify({ youtubeTestOne, youtubeTestTwo }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
  
      
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

