import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export type loginInput = z.infer<typeof loginSchema>;
