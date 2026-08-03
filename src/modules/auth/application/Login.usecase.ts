import { BcryptServices } from "@/services/bcrypt/BcryptServices";
import { AuthRepository } from "../domain/auth.repository.interface";
import { JWTTokenServices } from "@/services/token/JWTToken";

export class Login {
  constructor(
    private readonly authReposit: AuthRepository,
    private readonly bcryptService: BcryptServices,
    private readonly jwtToken: JWTTokenServices
  ) {}

  async execute(
    email: string,
    password: string,
    userDetails: { userAgent: string; ipAddress: string }
  ) {
    const user = await this.authReposit.findByEmail(email);

    if (!user) throw new Error("User doesnt exist!");

    const matchPasswords = this.bcryptService.comparePassword(
      password,
      user.password
    );

    if (!matchPasswords) throw new Error("Passwords doesnt match!");

    await this.authReposit.login(email, password);

    const accessToken = this.jwtToken.generateAccessToken(user.id);
    const refreshToken = this.jwtToken.generateRefreshToken(user.id);

    const { exp } = this.jwtToken.decodeToken(refreshToken);

    await this.authReposit.updateSession(user.id.toString(), {
      ...userDetails,
      refreshToken,
      expiresAt: new Date(exp! * 1000),
    });

    return { accessToken, refreshToken };
  }
}
