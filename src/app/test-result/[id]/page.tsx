"use client";
import { YoutubeVideoAnalytics } from "@/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PreviewTestPage = ({ params: { id } }: { params: { id: string } }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<YoutubeVideoAnalytics | null>(null);

  useEffect(() => {
    const getYoutubeTestOne = async () => {
      try {
        const response = await fetch("/api/preview-task");

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          setLoading(false);
          return;
        }

        const youtubeTestOne: YoutubeVideoAnalytics = await response.json();
        setData(youtubeTestOne);
        console.log("YouTube Analytics Data:", youtubeTestOne);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    getYoutubeTestOne();
  }, []);
  if (loading) {
    <div></div>;
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Test Results</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Metrics</TableHead>
            <TableHead className="w-[100px]">Test A</TableHead>
            <TableHead className="w-[100px]">Test B</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium capitalize">
              {data?.youtubeTestOne.columnHeaders.map((item) => (
                <p className="py-2">{item.name}</p>
              ))}
            </TableCell>
            <TableCell className="font-medium">
              {data?.youtubeTestOne.rows[0].map((item) => (
                <p className="py-2">{item}</p>
              ))}
            </TableCell>
            <TableCell className="font-medium">
              {data?.youtubeTestTwo.rows[0].map((item) => (
                <p className="py-2">{item}</p>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>Test result for video id {id}</TableCaption>
      </Table>
    </section>
  );
};

export default PreviewTestPage;
