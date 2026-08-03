import { IServiceFeature } from "@/modules/services/domain/types/service.types.ts";
import { ITask } from "../../tasks/domain/types/task.types.ts";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: IRole;
  createdAt: Date;
  updatedAt?: Date;
  clientId?: string;
  isVerified: boolean | false;
  tasks?: ITask[];
}
export type IRole = "ADMIN" | "USER" | "DEVELOPER";

export interface ISession {
  id: string;
  userId: string;
  user?: IUser;
  refreshToken: string;
  userAgent?: string; // optional: store browser/device info
  ipAddress?: string; // optional: store IP for security audits
  createdAt?: Date;
  expiresAt?: Date; // refresh token expiration
}

export type Option = {
  id: string;
  title: string;
  description?: string;
  price: number;
  included?: boolean;
  dependsOn?: string[];
};
export type Service = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  options: IServiceFeature[];
};
export type ContactInfo = {
  name: string | null;
  email: string | null;
  phone?: string | number;
};
