import { AuthRepository } from "../domain/auth.repository.interface";

export class VerifyEmail {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(email: string) {
    const emailDTO = await this.authRepo.findByEmail(email);

    if (!emailDTO) {
      throw new Error("invalid credenials");
    }
  }
}
