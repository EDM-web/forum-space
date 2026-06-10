import { prisma } from "@/lib/prisma";
import { Post } from "../../../../generated/prisma/client";

export const getAllPosts = async (): Promise<Post[]> => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
