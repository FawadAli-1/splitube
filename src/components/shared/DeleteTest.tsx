"use client";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { deleteTestResult } from "@/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteTest = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deleteTest = async () => {
    setLoading(true);
    const response = await deleteTestResult();
    if (!response?.success) {
      toast({
        title: response?.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    toast({
      title: response?.message,
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <Button
      variant={"destructive"}
      className="flex justify-center items-center gap-1"
      onClick={deleteTest}
      disabled={loading}
    >
      <X />
      Delete
    </Button>
  );
};

export default DeleteTest;
