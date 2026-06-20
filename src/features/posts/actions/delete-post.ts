"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDeleteSchema } from "../schemas";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/is-owner";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const owner = await isOwner(session.user.id);

    if (!owner) {
      throw new Error("You are not owner.");
    }
    await prisma.post.delete({
      where: {
        id: parsedInput.id,
      },
    });

    revalidatePath(postsPath);

    redirect(postsPath);
  });
