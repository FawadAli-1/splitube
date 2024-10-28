"use client";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const PreviewTestPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

        const youtubeTestOne = await response.json();
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
    <div>
        
    </div>
    return <div className="flex items-center justify-center">
      <Loader className="animate-spin"/>;
    </div>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Hello</div>;
};

export default PreviewTestPage;
