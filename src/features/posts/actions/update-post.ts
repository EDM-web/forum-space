"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schemas";
import { getSession } from "@/lib/getSession";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }
    await prisma.post.update({
      where: {
        id: parsedInput.id,
      },
      data: {
        title: parsedInput.title,
        body: parsedInput.body,
        status: parsedInput.status,
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
