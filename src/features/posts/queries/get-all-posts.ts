import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
}

export const getAllPosts = async (
  userId: string | undefined
): Promise<postWithUser[]> => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
};
