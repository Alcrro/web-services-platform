// task.repository.types.ts
import { Prisma } from "@prisma/client";

export interface FindAllTasksRepoInput {
  where?: Prisma.TaskWhereInput;
  orderBy?: Prisma.TaskOrderByWithRelationInput;
  skip?: number;
  take?: number;
}
