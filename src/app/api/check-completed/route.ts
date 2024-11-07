import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { auth } from "@clerk/nextjs/server";

export const GET = async (res: NextApiResponse) => {
  try {
    await connectToDb();

    const { userId } = auth();
    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not authenticated",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await VideoTestModel.findOne({ userId });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const { isCompleted } = user;
    return new Response(
      JSON.stringify({ success: true, message: "Success", isCompleted }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking user completion status:", error);
    return new Response(
      JSON.stringify({ success: false, message: "An error occured"}),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
