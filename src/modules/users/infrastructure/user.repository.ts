import { IUser } from "@/modules/auth/domain/auth.types";
import { UserRepository } from "../domain/user.repository.interface";
import { PrismaClient } from "@prisma/client";
import { userMapperDocToDo } from "./userMapper";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}
  async findOne(userId: string): Promise<Omit<IUser, "password"> | null> {
    try {
      const result = await this.db.user.findUnique({
        where: { id: Number(userId) },
        include: {},
      });

      if (!result) return null;
      return userMapperDocToDo(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("internal db error");
    }
  }
}
