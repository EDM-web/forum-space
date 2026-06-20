import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser {
  user: User;
}

export const getSinglePost = async (
  id: string
): Promise<postWithUser | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};
