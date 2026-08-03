import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET!;

interface VerifiedToken extends JwtPayload {
  status: "valid" | "expired" | "invalid";
}

export class JWTTokenServices {
  generateAccessToken(userId: number) {
    const payload = { userId };
    const options: SignOptions = {
      expiresIn: "15m",
    };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  generateRefreshToken(userId: number) {
    const payload = { userId, type: "refresh" };
    const options: SignOptions = { expiresIn: "7d" };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  verifyToken(token: string): VerifiedToken {
    try {
      const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        userId: string;
      };
      return { ...decode, status: "valid" };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "TokenExpiredError") {
        return { status: "expired" } as VerifiedToken;
      }

      return { status: "invalid" } as VerifiedToken;
    }
  }

  decodeToken(token: string): JwtPayload & { userId: string } {
    return jwt.decode(token) as JwtPayload & { userId: string };
  }
}
