import { z } from "zod";

// form zod validation schema
export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => value.length === 9, {
      message: "Phone number must  be 9 digits long",
    }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

// generate form types from zod validation schema used for form
export type LoginSchema = z.infer<typeof loginSchema>;
