"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { it } from "node:test";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const SubmitButton = ({ text, variant }: iAppProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" />
        </Button>
      ) : (
        <Button className="w-full" type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
