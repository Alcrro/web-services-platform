import { JWTTokenServices } from "@/services/token/JWTToken";
import { AuthRepository } from "../domain/auth.repository.interface";

export class RefreshToken {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtTokenServices: JWTTokenServices
  ) {}

  async execute(
    accessToken: string,
    refreshToken: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{
    generateAccessToken: string;
    generateRefreshToken: string;
    userId: number;
    expiredAt: Date;
  } | void> {
    const verifyAccessToken = this.jwtTokenServices.verifyToken(accessToken);

    if (verifyAccessToken.status === "valid") return;

    const { generateAccessToken, generateRefreshToken, userId, expiredAt } =
      this.ensureToken(refreshToken);

    await this.authRepo.updateSession(userId.toString(), {
      refreshToken: generateRefreshToken,
      expiresAt: new Date(expiredAt),
      ipAddress,
      userAgent,
    });

    return { generateAccessToken, generateRefreshToken, userId, expiredAt };
  }

  private ensureToken(refreshToken: string) {
    const verifyRefreshToken = this.jwtTokenServices.verifyToken(refreshToken);

    if (
      verifyRefreshToken.status === "expired" ||
      verifyRefreshToken.status === "invalid"
    ) {
      throw new Error("Refresh token is not valid");
    }

    const generateAccessToken = this.jwtTokenServices.generateAccessToken(
      verifyRefreshToken.userId
    );
    const generateRefreshToken = this.jwtTokenServices.generateRefreshToken(
      verifyRefreshToken.userId
    );

    const { exp } = this.jwtTokenServices.decodeToken(generateRefreshToken);

    return {
      generateAccessToken,
      generateRefreshToken,
      userId: verifyRefreshToken.userId,
      expiredAt: new Date(exp! * 1000),
    };
  }
}
