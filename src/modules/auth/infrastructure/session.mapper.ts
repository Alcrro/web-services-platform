import { Session } from "@prisma/client";
import { ISession } from "../domain/auth.types";

export function sessionMapperDocToDom(session: Session): ISession {
  return {
    id: session.id.toString(),
    userId: session.userId.toString(),
    refreshToken: session.refreshToken,
    ipAddress: session.ipAddress ?? "unknown",
    userAgent: session.userAgent ?? "unknown",
  };
}
