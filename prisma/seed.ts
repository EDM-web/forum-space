import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

export const fake_posts = [
  {
    userId: "R0AHbBH068QWR35Cou0nMUeCWBjFRaHd",
    title: "First Post",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, facere earum, assumenda accusamus et a quo dolor vero error vel qui, quod distinctio nostrum sapiente dolorem eveniet quaerat fugiat! Esse!",
  },
  {
    userId: "R0AHbBH068QWR35Cou0nMUeCWBjFRaHd",
    title: "Second Post",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, facere earum, assumenda accusamus et a quo dolor vero error vel qui, quod distinctio nostrum sapiente dolorem eveniet quaerat fugiat! Esse!",
  },
  {
    userId: "R0AHbBH068QWR35Cou0nMUeCWBjFRaHd",
    title: "Third Post",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, facere earum, assumenda accusamus et a quo dolor vero error vel qui, quod distinctio nostrum sapiente dolorem eveniet quaerat fugiat! Esse!",
  },
  {
    userId: "R0AHbBH068QWR35Cou0nMUeCWBjFRaHd",
    title: "Fourth Post",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, facere earum, assumenda accusamus et a quo dolor vero error vel qui, quod distinctio nostrum sapiente dolorem eveniet quaerat fugiat! Esse!",
  },
];

const seed = async () => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: fake_posts,
  });
  console.log("database seeded...");
};

seed();
