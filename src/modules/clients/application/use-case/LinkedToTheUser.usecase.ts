import { AuthRepository } from "@/modules/auth/domain/auth.repository.interface";
import { IClient } from "../../domain/types/client.types";
import { ClientRepository } from "../../domain/repositories/client.repository.interface";

export class ClientLinkingToTheUser {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(
    userId: string,
    value: "yes"
  ): Promise<{ userEmail: string; client: Partial<IClient> }> {
    console.log({ value });

    const user = await this.authRepo.getOne(userId);
    if (!user) throw new Error("user not found");
    const client = await this.ensureClientMatch(user.email);
    if (!client) throw new Error("No client");
    if (client && value === "yes") {
      await this.authRepo.update(userId, { clientId: client.id });
    }
    return { userEmail: user.email, client };
  }

  async ensureClientMatch(email: string) {
    const client = await this.clientRepo.findByEmail(email);

    return client;
  }
}
