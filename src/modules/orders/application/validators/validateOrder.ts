import { ContactInfo } from "@/modules/auth/domain/auth.types";
import z from "zod";
export type ClientVerificationResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors:
        | (Record<string, string[] | string> & { formErrors?: string[] })
        | string;
    };

export const clientDetailsVerificationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").nullable(),
  email: z.string().email("invalid email").nullable(),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.trim() === "" || /^\d{10,}$/.test(v),
      "Phone must be at least 10 digits"
    )
    .or(z.number().gte(10)),
});

export function clientDetailsVerification(
  data: ContactInfo
): ClientVerificationResult {
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

  return { success: true };
}
