import { AuthRepository } from "../domain/auth.repository.interface";

export class UpdateSession {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(userId: string, newRefreshToken: string, expiredAt: number) {
    await this.authRepo.updateSession(userId, {
      refreshToken: newRefreshToken,
      expiresAt: new Date(expiredAt * 1000),
    });
  }
}
