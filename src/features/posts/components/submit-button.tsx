"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProp = {
  label: string;
};
const SubmitButton = ({ label }: SubmitButtonProp) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : label}
    </Button>
  );
};

export default SubmitButton;
