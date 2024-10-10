"use server";

import { connectToDb } from "@/database";
import VideoTestModel from "@/database/schemas/VideoTestSchema";
import { IChannelId, TUploadThingData, YoutubeData } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import cron from "node-cron";

// GET ALL VIDEOS

const { userId } = auth();

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

// const task = cron.schedule(
//   "*/2 * * * * *",
//   () => {
//     const now = new Date();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();
//     console.log("Test started", minutes, seconds);
//   },
//   {
//     scheduled: false,
//   }
// );

const userTasks: any = {};

// export const startUserTask = async (userId: any) => {
//   const task = cron.schedule("*/2 * * * * *", () => {
//     console.log(`Task running for user: ${userId}`);
//   });

//   userTasks[userId] = task;

//   console.log(`Task started for user: ${userId}`);
// };

// export const stopUserTask = async (userId: any) => {
//   if (userTasks[userId]) {
//     userTasks[userId].stop();
//     console.log(`Task stopped for user: ${userId}`);

//     delete userTasks[userId];
//   } else {
//     console.log(`No task found for user: ${userId}`);
//   }
// };

export const saveThumbnail = async (data: TUploadThingData) => {
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
    } else if (userExists && userExists.testingInProgress) {
      return { success: false, message: "Only one test per user is allowed" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateThumbnail = async (data: TUploadThingData) => {
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
            thumbnailUrlB: data[0].url,
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else if (userExists && userExists.testingInProgress) {
      return { success: false, message: "Only one test per user is allowed" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkForThumbnailInDb = async () => {
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

  // if (!userId) {
  //   return console.log("User not logged in");
  // }

  // const provider = "oauth_google";

  // try {
  //   const clerkResponse = await clerkClient().users.getUserOauthAccessToken(
  //     userId,
  //     provider
  //   );

  //   const accessToken = clerkResponse.data[0].token;

  //   const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics`;

  //   const youtubeResponse = await fetch(youtubeUrl, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: "fCTOWh-8yOM",
  //       snippet: {
  //         categoryId: 20,
  //         defaultLanguage: "en",
  //         description: "Description changed using API",
  //         title: "API requested changed in video",
  //       },
  //     }),
  //   });

  //   if (!youtubeResponse.ok) {
  //     console.error(
  //       `YouTube API Error: ${youtubeResponse.status} - ${youtubeResponse.statusText}`
  //     );
  //     const errorText = await youtubeResponse.text();
  //     console.error("YouTube API Error Response:", errorText);
  //     return;
  //   }

  //   const youtubeVideoData = await youtubeResponse.json();
  //   console.log(youtubeVideoData);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const updateAndSaveFormTwoToDb = async (data: {
  title: string;
  description: string;
  tags: string;
}) => {
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

export const checkIfTestingInProgressIsTrue = async () => {
  try {
    await connectToDb()

    const user = await VideoTestModel.findOneAndUpdate({userId})
    if(user?.testingInProgress){
      return {success: false, message: "Only one test is allowed per user"}
    }
  } catch (error) {
    console.error(error)
  }
};
