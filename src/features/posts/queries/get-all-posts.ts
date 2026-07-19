import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";
import { SearchParams } from "../types/search-params";

interface postWithUser extends Post {
  user: User;
}

export const getAllPosts = async (
  userId: string | undefined,
  searchParams: SearchParams
): Promise<postWithUser[]> => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: searchParams.sort?.toString() === "asc" ? "asc" : "desc",
    },
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
    },
  });
};
