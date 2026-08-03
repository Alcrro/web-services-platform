"use client";
import DefaultTable from "@/components/ui/defaultTable/DefaultTable";
import { IClient } from "@/modules/clients/domain/types/client.types";
import { IMetaPagination } from "@/modules/globals/types/types";
import { createColumnRegistry } from "@/modules/orders/components/orderTableColumns/columnCellsRegistry";
import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";

interface IClientTableClientProps {
  data: IClient[];

  meta: IMetaPagination;
}

const columnCellsRegistry = createColumnRegistry<IClient>();
const ClientsTableClient: FC<IClientTableClientProps> = ({ data, meta }) => {
  const columns: ColumnDef<IClient>[] = [
    columnCellsRegistry.clientName(),
    { ...columnCellsRegistry.email() },
    { ...columnCellsRegistry.phone() },
  ];

  return <DefaultTable data={data} columns={columns} meta={meta} />;
};

export default ClientsTableClient;
