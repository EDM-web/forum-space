"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postCreateSchema } from "../schemas";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.post.create({
        data: {
          userId: session?.user.id,
          title: parsedInput.title,
          body: parsedInput.body,
        },
      });

      revalidatePath(postsPath);
      return { message: "post created" };
    } catch (error) {
      throw new Error("create post : Something went wrong");
      // return { message: "Something went wrong.", payload: formData };
    }
  });

// _actionState: { message: string; payload?: FormData },
// formData: FormData
