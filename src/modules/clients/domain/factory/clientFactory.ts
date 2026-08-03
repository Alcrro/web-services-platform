import { Create } from "../../application/use-case/Create.usecase";
import { FindAllUseCase } from "../../application/use-case/FindAll.usecase";
import { ClientRepositoryImpl } from "../../infrastructure/client.repository";
import { prisma } from "@/lib/prisma";

export function clientFactory() {
  const clientRepositoryImpl = new ClientRepositoryImpl(prisma);
  const findAllUseCase = new FindAllUseCase(clientRepositoryImpl);
  const createUseCase = new Create(clientRepositoryImpl);

  return { findAllUseCase, createUseCase };
}
