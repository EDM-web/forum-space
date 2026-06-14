import * as z from "zod";

export const authBaseSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});
