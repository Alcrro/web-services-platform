import { ISession, IUser } from "./auth.types";

export interface AuthRepository {
  register(email: string, name: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<IUser | null>;
  getOne(userId: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  verifyEmail(email: string): Promise<IUser | null>;
  update(id: string, update: Partial<IUser>): Promise<IUser | null>;
  updateSession(userId: string, update: Partial<ISession>): Promise<void>;
}
