"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postCreateSchema } from "../schemas";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput }) => {
    try {
      await prisma.post.create({
        data: {
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
