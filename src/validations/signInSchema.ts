import { z } from "zod";

const signInSchemaValidation = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type signInSchemaType = z.infer<typeof signInSchemaValidation>;

export { signInSchemaValidation, type signInSchemaType };
