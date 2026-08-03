// utils/prismaDecimal.ts

import { Prisma } from "../../../prisma/app/generated/prisma/client/index.js";

export const toDecimal = (value: number | undefined | null) =>
  new Prisma.Decimal(value ?? 0);

export const fromDecimal = (value: Prisma.Decimal | null | undefined) =>
  value?.toNumber() ?? 0;
