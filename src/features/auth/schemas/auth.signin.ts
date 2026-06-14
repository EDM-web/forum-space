import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signInSchema = z.object({
  //   ...authBaseSchema,
  email: z.string(),
  password: z.string().min(6),
});
