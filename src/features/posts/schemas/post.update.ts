import z from "zod";
import { postBaseSchema } from "./post.base";

export const postUpdateSchema = z.object({
  id: z.string(),
  status: z.enum(["DONE", "IN_PROGRESS"]),
  title: z.string().min(3).max(30),
  body: z.string().min(3),
});
