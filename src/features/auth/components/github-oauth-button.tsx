"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GitBranch } from "lucide-react";

const GithubOauthButton = () => {
  const githubOauthHandler = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };
  return (
    <Button
      onClick={githubOauthHandler}
      variant={"outline"}
      className="cursor-pointer"
    >
      <GitBranch /> <span>Continue with Github</span>{" "}
    </Button>
  );
};

export default GithubOauthButton;
