"use server";

import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { signInSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const signIn = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput }) => {
    try {
      const input = parsedInput;
      await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
      });
    } catch (error) {
      // console.log(error);
      throw new Error("Sign up : Something went wrong");
    }

    redirect(postsPath);
  });
