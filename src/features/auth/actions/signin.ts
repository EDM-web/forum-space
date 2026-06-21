"use server";

import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { signInSchema } from "../schemas";
import { auth } from "@/lib/auth";

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

      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.message || error.body.message || "Something went wrong";
      return {
        success: false,
        error: errorMessage,
      };
    }
  });
