import { IUser } from "./../domain/auth.types";
import { User } from "@prisma/client";

export function authMapperDomToDoc(user: IUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role || "USER",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || new Date(),
    clientId: user.clientId || "",
    isVerified: user.isVerified || false,
  };
}

export function authMapperDocToDom(user: User): IUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role || "USER",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || new Date(),
    clientId: user.clientId || "",
    isVerified: user.isVerified || false,
  };
}
