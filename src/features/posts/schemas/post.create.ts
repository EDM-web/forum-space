import { postBaseSchema } from "./post.base";
import * as z from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().min(3),
});
