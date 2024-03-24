import { z } from "zod";

const signUpSchemaValidation = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ["confirmPassword"],
  });

type signUpSchemaType = z.infer<typeof signUpSchemaValidation>;

export { signUpSchemaValidation, type signUpSchemaType };
