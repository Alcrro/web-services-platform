import { UserRepository } from "../domain/user.repository.interface";

export class FindById {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string) {
    console.log("userId ", userId);

    const user = await this.userRepo.findOne(userId);

    if (!user) {
      throw new Error("no user");
    }

    return user;
  }
}
