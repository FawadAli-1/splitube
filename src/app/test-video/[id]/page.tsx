"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  checkForThumbnailInDb,
  getOneVideo,
  saveThumbnail,
  testOneInProgress,
  toggleTestingInProgess,
  updateAndSaveFormOneToDb,
  updateAndSaveFormTwoToDb,
  updateThumbnail,
} from "@/actions";
import { YoutubeData } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { splittestSchema } from "@/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UploadDropzone } from "@/utils/uploadthing";
import { SendHorizonal } from "lucide-react";

const TestVideoPage = ({ params: { id } }: { params: { id: string } }) => {
  const [videoData, setVideoData] = useState<YoutubeData | null>(null);
  const [uploadCompleted1, setUploadCompleted1] = useState(false);
  const [uploadCompleted2, setUploadCompleted2] = useState(false);
  const { toast } = useToast();

  const startTask = async()=> {
    const response = await fetch("/api/schedule-task", {
      method: "POST",
    })

    const result = await response.json();
    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
    }
  }

  useEffect(() => {
    const fetchVideoData = async () => {
      const data: YoutubeData = await getOneVideo(id);
      setVideoData(data);
    };

    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const form1 = useForm<z.infer<typeof splittestSchema>>({
    resolver: zodResolver(splittestSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const form2 = useForm<z.infer<typeof splittestSchema>>({
    resolver: zodResolver(splittestSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const onSubmitBothFormsAndUpload = async () => {
    try {
      const response = await checkForThumbnailInDb();
      if (!response?.success) {
        toast({
          title: response?.message,
          variant: "destructive",
        });
        return;
      }

      await form1.handleSubmit((values) => updateAndSaveFormOneToDb(values))();
      await form2.handleSubmit((values) => {
        updateAndSaveFormTwoToDb(values);
      })();

      await toggleTestingInProgess();

      await testOneInProgress(id)

      await startTask()

      // await startUserTask(userId!)

      form1.reset();
      form2.reset();
    } catch (error) {
      console.error("Error submitting forms or uploading files:", error);
      toast({
        title: "An error occurred during submission.",
        variant: "destructive",
      });
    }
  };

  const saveThumbnailToDb = async (data) => {
    await saveThumbnail(data);
    toast({
      title: "Thumbnail A successfully added",
      className: "bg-green-600 text-slate-50",
    });
  };

  const updateThumbnailInDb = async (data) => {
    await updateThumbnail(data);
    toast({
      title: "Thumbnail B successfully added",
      className: "bg-green-600 text-slate-50",
    });
  };

  return (
    <section>
      {videoData?.items.map((item) => {
        const { title } = item.snippet;
        return (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-center">
                Video Title:{" "}
                <span className="text-base font-normal ">{title}</span>{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-center md:gap-32">
                <div>
                  <h1 className="text-sm font-medium">Thumbnail (A)</h1>
                  <Form {...form1}>
                    <UploadDropzone
                      endpoint="imageUploader"
                      config={{ mode: "auto" }}
                      onClientUploadComplete={(res) => {
                        setUploadCompleted1(true);
                        saveThumbnailToDb(res);
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          title: error.message,
                          variant: "destructive",
                        });
                      }}
                      disabled={uploadCompleted1}
                    />
                    <form className="space-y-8">
                      <FormField
                        control={form1.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (A)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter video title"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This will be the video title.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form1.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (A)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter video description"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Describe your video content.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form1.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags (A)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter tags (comma-separated)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Tags for your video.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div>
                  <Form {...form2}>
                    <h1 className="text-sm font-medium">Thumbnail (B)</h1>
                    <UploadDropzone
                      endpoint="imageUploader"
                      config={{ mode: "auto" }}
                      onClientUploadComplete={(res) => {
                        setUploadCompleted2(true);
                        updateThumbnailInDb(res);
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          title: error.message,
                          variant: "destructive",
                        });
                      }}
                      disabled={uploadCompleted2}
                    />
                    <form className="space-y-8">
                      <FormField
                        control={form2.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (B)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter video title"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This will be the video title.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form2.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (B)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter video description"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Describe your video content.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form2.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags (B)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter tags (comma-separated)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Tags for your video.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
              <CardFooter className="flex items-center justify-center mt-8">
                <Button
                  className="flex items-center gap-2"
                  onClick={onSubmitBothFormsAndUpload}
                >
                  Submit <SendHorizonal className="size-4" />
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default TestVideoPage;
