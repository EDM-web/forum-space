import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signUpSchema = z
  .object({
    email: z.string(),
    password: z.string().min(6),
    name: z.string().min(3),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

// export const signUpSchema = authBaseSchema
//   .merge(
//     z.object({
//       ...authBaseSchema,
//       name: z.string().min(3),
//       confirmPassword: z.string().min(6),
//     })
//   )
//   .superRefine(({ password, confirmPassword }, ctx) => {
//     if (password !== confirmPassword) {
//       ctx.addIssue({
//         code: "custom",
//         message: "Password do not match",
//         path: ["confirmPassword"],
//       });
//     }
//   });
