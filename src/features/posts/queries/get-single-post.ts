import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

export const getSinglePost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

// interface postWithUser {
//   user: User;
// }

// export const getSinglePost = async (
//   id: string
// ): Promise<postWithUser | null> => {
//   return await prisma.post.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//     },
//   });
// };
