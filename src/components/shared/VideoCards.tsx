"use client";

import { getAllVideos, startUserTask, stopUserTask } from "@/actions";
import { useState, useEffect } from "react";
import { YoutubeData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getContentType } from "@/lib/utils";
import Link from "next/link";

const VideoCards = () => {
  const [data, setData] = useState<YoutubeData | null>(null);
  const [loading, setLoading] = useState(false);
  const getYoutubeData = async () => {
    try {
      setLoading(true);
      const data: YoutubeData = await getAllVideos();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getYoutubeData();
  }, []);

  return (
    <div className="my-8 h-full flex flex-wrap justify-center gap-4">
      {data ? (
        data.items.map((item) => {
          const { standard } = item.snippet.thumbnails;
          const { duration } = item.contentDetails;
          const { publishedAt, title, description, tags } = item.snippet;
          const { viewCount } = item.statistics;

          const publishedDate = new Date(publishedAt);
          const contentType = getContentType(duration);
          return (
            <Card
              key={item.id}
              className="w-full md:w-1/4 hover:cursor-pointer hover:opacity-95"
            >
              <Link href={`/test-video/${item.id}`}>
                <CardHeader className="text-left">
                  <CardTitle className="text-lg line-clamp-1">
                    {title}
                  </CardTitle>
                  {contentType === "Short Form" ? (
                    <Badge className="w-1/2 md:w-2/3 lg:w-1/3 bg-red-600 hover:bg-red-600 hover:opacity-90">
                      {contentType}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-600 hover:bg-green-600 hover:opacity-90 w-1/3">
                      {contentType}
                    </Badge>
                  )}
                  <CardDescription>
                    {description === "" ? "No Description" : description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {standard ? (
                    <Image
                      src={standard.url}
                      alt="thumbnail"
                      width={standard.width}
                      height={standard.height}
                      priority
                    />
                  ) : (
                    "No Thumbnail"
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <p className="text-slate-950 font-bold">
                    Views: <span className="font-normal"> {viewCount}</span>
                  </p>
                  <p className="text-slate-950 font-bold">
                    Uploaded:{" "}
                    <span className="font-normal">
                      {publishedDate.toDateString()}
                    </span>
                  </p>
                  <p className="text-slate-950 font-bold">Tags:</p>
                  <div className="flex items-start flex-wrap gap-1">
                    {tags ? (
                      tags.map((tag) => (
                        <Badge key={Math.random()}>{tag}</Badge>
                      ))
                    ) : (
                      <span className="text-slate-500">No tags</span>
                    )}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          );
        })
      ) : (
        <h1 className="flex items-center justify-center">
          Loading videos, please wait
          <Loader className="size-5 animate-spin ml-1" />
        </h1>
      )}
    </div>
  );
};
export default VideoCards;
