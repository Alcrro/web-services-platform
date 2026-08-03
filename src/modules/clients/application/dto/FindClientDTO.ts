import { IMetaPagination } from "@/modules/globals/types/types";
import { IClient } from "../../domain/types/client.types";

export interface FindClientDTO {
  data: FindClient[];
  metadata: IMetaPagination;
}

export type FindClient = Omit<IClient, "isDeleted" | "deletedAt">;
