import { PrismaClient } from "@prisma/client";
import { AuthRepository } from "../domain/auth.repository.interface";
import { ISession, IUser } from "../domain/auth.types";
import { authMapperDocToDom } from "./auth.mapper";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly db: PrismaClient) {}

  async getOne(userId: string): Promise<IUser | null> {
    try {
      const result = await this.db.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!result) return null;

      return authMapperDocToDom(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal getOne db problem");
    }
  }

  async verifyEmail(email: string): Promise<IUser | null> {
    try {
      const result = await this.db.user.update({
        where: { email },
        data: { isVerified: true },
      });

      return authMapperDocToDom(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal verifyEmail db problem");
    }
  }
  async register(email: string, name: string, password: string): Promise<void> {
    try {
      await this.db.user.create({
        data: { email, name, password },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal db error");
    }
  }
  async login(email: string): Promise<IUser | null> {
    try {
      const result = await this.db.user.findUnique({
        where: { email },
      });
      if (!result) return null;
      return authMapperDocToDom(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal db error");
    }
  }
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const result = await this.db.user.findUnique({
        where: { email: email },
      });
      if (!result) return null;
      return authMapperDocToDom(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal db error");
    }
  }
  async updateSession(userId: string, data: ISession): Promise<void> {
    try {
      if (!data.expiresAt) throw new Error("expiresAt is required");

      const updateSession = {
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
      };

      const existing = await this.db.session.findFirst({
        where: { userId: Number(userId) },
      });
      if (existing) {
        await this.db.session.update({
          where: { id: existing.id },
          data: updateSession,
        });
      } else {
        await this.db.session.create({
          data: { userId: Number(userId), ...updateSession },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal db error");
    }
  }

  async update(id: string, update: Partial<IUser>): Promise<IUser | null> {
    try {
      const result = await this.db.user.update({
        where: { id: Number(id) },
        data: update,
      });

      if (!result) return null;
      return authMapperDocToDom(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("internal db error");
    }
  }
}
