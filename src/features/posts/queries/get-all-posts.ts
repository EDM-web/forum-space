import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
}

export const getAllPosts = async (): Promise<postWithUser[]> => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
};
