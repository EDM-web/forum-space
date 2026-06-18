"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { resetPasswordSchema } from "../schemas/auth.reset-password";
import { changePasswordPath, signInPath } from "@/path";

export const resetPassword = actionClient
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    try {
      const input = parsedInput;
      await auth.api.requestPasswordReset({
        body: {
          email: input.email,
          redirectTo: `${process.env.BETTER_AUTH_URL}/${changePasswordPath}`,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Sign up : Something went wrong");
    }

    // redirect(postsPath);
  });
