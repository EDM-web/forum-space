"use server";

import { actionClient } from "@/lib/safe-action";
import { signInPath } from "@/path";
import { signUpSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    } catch (error) {
      // console.log(error);
      throw new Error("Sign up : Something went wrong");
      // return { message: "Something went wrong.", payload: formData };
    }

    redirect(signInPath);
  });

// _actionState: { message: string; payload?: FormData },
// formData: FormData
