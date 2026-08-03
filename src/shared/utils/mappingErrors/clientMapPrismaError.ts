import { Prisma } from "../../../../prisma/app/generated/prisma/client";
import { AppError } from "../AppError";

export function clientMapPrismaError(error: unknown): AppError {
  const e = error as Error;
  const msg = (e?.message || String(e)) as string;

  // Prisma known errors (use code when available)
  if (
    typeof Prisma !== "undefined" &&
    e instanceof Prisma.PrismaClientKnownRequestError
  ) {
    switch (e.code) {
      case "P2002":
        return new AppError(
          msg,
          "Conflict: a record already exists (unique constraint)."
        );
      case "P2025":
        return new AppError(msg, "Related record not found.");
      default:
        return new AppError(msg, `Database error (${e.code}).`);
    }
  }

  // Useful specific text matches
  if (msg.includes("Argument `projectName` is missing")) {
    return new AppError(msg, "Please fill in the Project Name field");
  }
  if (msg.includes("Argument `serviceId` is missing")) {
    return new AppError(msg, "Service ID is required");
  }
  if (
    msg.includes("Expected value of type 'Int'") ||
    msg.includes("Invalid value for argument `serviceId`") ||
    msg.includes("Expected Int")
  ) {
    return new AppError(msg, "Service ID must be a number");
  }

  // fallback (still generic) but keep original message inside AppError for logging/dev
  return new AppError(msg, "Something went wrong. Please try again");
}
