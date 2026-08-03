import { IUser } from "@/modules/auth/domain/auth.types";
import { User } from "@prisma/client";

export function userMapperDocToDo(user: User): Omit<IUser, "password"> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "USER",
    clientId: user.clientId || "",
    createdAt: user.createdAt,
    isVerified: false,
  };
}
