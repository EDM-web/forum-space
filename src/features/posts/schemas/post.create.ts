import { postBaseSchema } from "./post.base";
import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3).max(30),
  body: z.string().min(3),
});
