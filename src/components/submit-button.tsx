"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProp = {
  label: string;
  isPending: boolean;
};
const SubmitButton = ({ label, isPending }: SubmitButtonProp) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={isPending} className="cursor-pointer">
      {isPending ? (
        <div>
          <LoaderCircle className="w-4 h-4 animate-spin" /> <span>{label}</span>
        </div>
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
