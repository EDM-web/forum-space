"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { changePasswordSchema } from "../schemas/auth.change-password";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

export const changePassword = actionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput }) => {
    try {
      const input = parsedInput;
      await auth.api.resetPassword({
        body: {
          newPassword: input.newPassword,
          token: input.token,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Change Password : Something went wrong");
    }

    redirect(signInPath);
  });
