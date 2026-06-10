import * as z from "zod";

export const postBaseSchema = z.object({
  title: z.string().min(3).max(30),
  body: z.string().min(3),
});
