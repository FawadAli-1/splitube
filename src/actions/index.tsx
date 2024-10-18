"use server";

import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { IChannelId, TUploadThingData } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import schedule from "node-schedule"

// GET ALL VIDEOS

export const getAllVideos = async () => {
  const { userId } = auth();

  if (!userId) {
    return console.log("User not logged in");
  }

  const provider = "oauth_google";

  try {
    const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
      userId,
      provider
    );

    const accessToken = clerkResponse.data[0].token;

    const youtubeUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true`;

    const youtubeResponse = await fetch(youtubeUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const channelId: IChannelId = await youtubeResponse.json();

    const uploadChannelId = channelId.items.map(
      (item) => item.contentDetails.relatedPlaylists.uploads
    );

    try {
      const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadChannelId}&maxResults=45`;

      const youtubeResponse = await fetch(youtubeUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const youtubeData = await youtubeResponse.json();
      const videoId = youtubeData.items.map(
        (item: any) => item.contentDetails.videoId
      );

      try {
        const youtubeVideoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}`;

        const youtubeResponse = await fetch(youtubeVideoDetailsUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const youtubeVideoData = await youtubeResponse.json();
        return youtubeVideoData;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(error);
  }
};

// GET A SINGLE VIDEO

export const getOneVideo = async (videoId: string) => {
  const { userId } = auth();

  if (!userId) {
    return console.log("User not logged in");
  }

  const provider = "oauth_google";

  try {
    const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
      userId,
      provider
    );

    const accessToken = clerkResponse.data[0].token;

    try {
      const youtubeVideoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}`;

      const youtubeResponse = await fetch(youtubeVideoDetailsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const youtubeVideoData = await youtubeResponse.json();
      return youtubeVideoData;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(error);
  }
};

const userTasks: any = {};

export const startUserTask = async (userId: any) => {

  const user = await VideoTestModel.findOne({ userId });

  if (!user || !user.testingInProgress) return;

  const task = schedule.scheduleJob(Date.now() + 120000,
    ()=> {
      console.log(`Task running for user: ${userId}`)
      task.cancel()
      console.log("TASK STOPPED");
      delete userTasks[userId]
    }
  );
  
  userTasks[userId] = task
  
  console.log(`Task started for user: ${userId}`);

  console.log(userTasks);
  
};

export const saveThumbnail = async (data: TUploadThingData) => {

  const { userId } = auth();

  try {
    await connectToDb();

    const userExists = await VideoTestModel.findOne({ userId: userId });

    if (!userExists) {
      try {
        await VideoTestModel.create({
          thumbnailUrlA: data[0].url,
          userId: userId,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (userExists && !userExists.testingInProgress) {
      try {
        await VideoTestModel.findOneAndUpdate(
          { userId },
          {
            thumbnailUrlA: data[0].url,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateThumbnail = async (data: TUploadThingData) => {

  const { userId } = auth();

  try {
    await connectToDb();

    const userExists = await VideoTestModel.findOne({ userId: userId });

    if (!userExists) {
      try {
        await VideoTestModel.create({
          thumbnailUrlB: data[0].url,
          userId: userId,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (userExists && !userExists.testingInProgress) {
      try {
        await VideoTestModel.findOneAndUpdate(
          { userId },
          {
            thumbnailUrlB: data[0].url,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkForThumbnailInDb = async () => {

  const { userId } = auth();

  await connectToDb();

  try {
    const user = await VideoTestModel.findOne({ userId });
    if (!user?.thumbnailUrlA || !user?.thumbnailUrlB)
      return { success: false, message: "Thumbnail A or B not added" };

    return {
      success: true,
      message: "Thumbnail A and B both added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while checking thumbnails",
    };
  }
};

export const updateAndSaveFormOneToDb = async (data: {
  title: string;
  description: string;
  tags: string;
}) => {

  const { userId } = auth();

  await connectToDb();

  try {
    await VideoTestModel.findOneAndUpdate(
      { userId },
      {
        titleA: data.title,
        descriptionA: data.description,
        tagsA: data.tags,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateAndSaveFormTwoToDb = async (data: {
  title: string;
  description: string;
  tags: string;
}) => {

  const { userId } = auth();

  await connectToDb();

  try {
    await VideoTestModel.findOneAndUpdate(
      { userId },
      {
        titleB: data.title,
        descriptionB: data.description,
        tagsB: data.tags,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const toggleTestingInProgess = async () => {

  const { userId } = auth();

  try {
    await connectToDb();

    await VideoTestModel.findOneAndUpdate(
      { userId },
      {
        testingInProgress: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const testOneInProgress = async (id: string) => {

  const { userId } = auth();

  await connectToDb();

  const user = await VideoTestModel.findOne({ userId });

  if (!userId || !user) {
    return console.log("User not logged in");
  }

  const { titleA, descriptionA, tagsA, thumbnailUrlA } = user;

  const provider = "oauth_google";

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
        id,
        snippet: {
          categoryId: 20,
          defaultLanguage: "en",
          description: descriptionA,
          title: titleA,
          tags: tagsA,
        },
      }),
    });

    const youtubeThumbnailUrl = `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${id}`;

    const thumbnailResponse = await fetch(thumbnailUrlA);
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
      return console.log(
        `Youtube Api Error: ${youtubeThumbnail.status} - ${youtubeThumbnail.statusText}`
      );
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
};
