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

const TestResult = ({params: id}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState<YoutubeVideoAnalytics | null>(null);

  useEffect(() => {
    const checkIfUserIsCompleted = async () => {
      try {
        const response = await fetch("/api/check-completed");
        const { isCompleted } = await response.json();
        setCompleted(isCompleted);
      } catch (error) {
        console.error("Error checking completion status:", error);
      }
    };

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
        console.log(youtubeTestOne);
        setData(youtubeTestOne);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    checkIfUserIsCompleted();
    getYoutubeTestOne();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (completed === false) {
    return <p>No results, wait till test is finished.</p>;
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Test Results
      </h1>
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
              {data?.youtubeTestOne?.columnHeaders?.map((item) => (
                <p className="py-2" key={item.name}>
                  {item.name}
                </p>
              ))}
            </TableCell>
            <TableCell className="font-medium">
              {data?.youtubeTestOne?.rows[0]?.map((item) => (
                <p className="py-2" key={item}>
                  {item}
                </p>
              ))}
            </TableCell>
            <TableCell className="font-medium">
              {data?.youtubeTestTwo?.rows[0]?.map((item) => (
                <p className="py-2" key={item}>
                  {item}
                </p>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>Test result for video id {id}</TableCaption>
      </Table>
    </section>
  );
}
  ;

export default TestResult;
