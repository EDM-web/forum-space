"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type SubmitButtonProp = {
  label: string;
  isPending: boolean;
};
const SubmitButton = ({ label, isPending }: SubmitButtonProp) => {
  return (
    <Button type="submit" disabled={isPending} className="cursor-pointer">
      {isPending ? (
        <div className="flex gap-1">
          <LoaderCircle className="w-4 h-4 animate-spin" /> <span>{label}</span>
        </div>
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
