"use server";

import { actionClient } from "@/lib/safe-action";
import { homePath } from "@/path";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    // console.log(error);
    throw new Error("Sign out : Something went wrong");
  }

  redirect(homePath);
};
