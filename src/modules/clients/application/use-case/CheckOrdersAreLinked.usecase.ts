import { AuthRepository } from "@/modules/auth/domain/auth.repository.interface";

export class CheckOrdersAreLinked {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(userId: string): Promise<boolean> {
    const user = await this.authRepo.getOne(userId);

    if (user?.clientId === "") {
      return false;
    }

    return true;
  }
}
