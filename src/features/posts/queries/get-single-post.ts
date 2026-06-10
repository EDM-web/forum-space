import { prisma } from "@/lib/prisma";
import { Post } from "../../../../generated/prisma/client";

export const getSinglePost = async (id: string): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};
