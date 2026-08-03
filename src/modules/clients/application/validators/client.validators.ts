import { ContactInfo } from "@/modules/auth/domain/auth.types";
import z from "zod";

export const clientDetailsVerificationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("invalid email"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.trim() === "" || /^\d{10,}$/,
      "Phone must be at least 10 digits"
    )
    .or(z.number().gte(10)),
});

export function clientDetailsVerification(data: ContactInfo) {
  const result = clientDetailsVerificationSchema.safeParse(data);

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten();

    return {
      success: false,
      errors: {
        ...fieldErrors,
        ...(formErrors.length ? { formErrors } : {}),
      },
    };
  }

  return { success: true, data: result.data };
}
