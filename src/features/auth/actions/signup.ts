"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schemas";
import { auth } from "@/lib/auth";

export const signUp = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }) => {
    try {
      const input = parsedInput;
      await auth.api.signUpEmail({
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      return { success: true, error: null };
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.message || error.body.message || "Someting went wrong";

      return {
        success: false,
        error: errorMessage,
      };
    }
  });
