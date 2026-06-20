"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schemas";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/is-owner";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const owner = await isOwner(session.user.id);

    if (!owner) {
      throw new Error("You are not owner");
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
