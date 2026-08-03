import { BcryptServices } from "@/services/bcrypt/BcryptServices";
import { AuthRepository } from "../domain/auth.repository.interface";
import { IUser } from "../domain/auth.types";

export class Register {
  constructor(
    private readonly authRepos: AuthRepository,
    private readonly bcryptService: BcryptServices
  ) {}

  async execute({
    email,
    name,
    password,
  }: Pick<IUser, "email" | "name" | "password">): Promise<void> {
    //TODO make zod verfifiation for entries
    const user = await this.authRepos.findByEmail(email);

    if (!user) {
      const hashedPassword = await this.bcryptService.hashedPassword(password);

      await this.authRepos.register(email, name, hashedPassword);
    }
  }
}
