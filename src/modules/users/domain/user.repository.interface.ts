import { IUser } from "@/modules/auth/domain/auth.types";

export interface UserRepository {
  findOne(userId: string): Promise<Omit<IUser, "password"> | null>;
}
