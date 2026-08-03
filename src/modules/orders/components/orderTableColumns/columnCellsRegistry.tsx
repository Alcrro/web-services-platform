"use client";
import { ColumnDef } from "@tanstack/react-table";
import ExpenderHeaderColumn from "./ExpenderHeaderColumn";
import StatusHeaderColumn from "./StatusHeaderColumn";
import ServiceNameOrderTable from "./ServiceNameOrderTable";
import InitialPriceHeaderColumn from "./InitialPriceHeaderColumn";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";
import IncludedFeaturesHeaderColumn from "./IncludedFeaturesHeaderColumn";
import TotalPriceHeaderColumn from "./TotalPriceHeaderColumn";
import { ActionHeaderColumn } from "./ActionHeaderColumn";
import { AnimatedCell } from "@/components/ui/AnimatedText";
import CreatedAtHeaderColumn from "./CreatedAtHeaderColumn";

export const createColumnRegistry = <T extends { id?: string }>() => {
  const register = {
    expander: () => ({
      id: "expander",
      cell: ({ row }) => <ExpenderHeaderColumn row={row} />,
    }),
    projectName: () => ({ accessorKey: "projectName", header: "Project name" }),
    serviceName: () => ({
      accessorKey: "serviceName",
      header: () => <ServiceNameOrderTable />,
    }),
    status: () => ({
      accessorKey: "status",
      header: () => <StatusHeaderColumn />,
    }),
    initialPrice: () => ({
      accessorKey: "initialPrice",
      id: "initialPrice",
      header: () => <InitialPriceHeaderColumn />,
      cell: ({ getValue }) => formatPriceValue(getValue<string>()),
    }),
    requirements: () => ({
      accessorKey: "requirements",
      header: "Requirements",
    }),

    includedFeatures: (isLoading = false) => ({
      accessorKey: "includedFeatures",
      id: "includedFeatures",
      header: "Included Features",
      cell: ({ getValue }) => (
        <IncludedFeaturesHeaderColumn
          getValue={getValue}
          isLoading={isLoading}
        />
      ),
    }),
    extraFeatures: (isLoading = false) => ({
      accessorKey: "extraFeatures",
      header: "Extra Features",
      cell: ({ getValue }) => (
        <IncludedFeaturesHeaderColumn
          getValue={getValue}
          isLoading={isLoading}
        />
      ),
    }),
    extraFeaturesTotalPrice: () => ({
      accessorKey: "extraFeaturesTotalPrice",
      header: "Extra Features Price",
      cell: ({ getValue }) => formatPriceValue(getValue<string>()),
    }),
    totalPrice: () => ({
      accessorKey: "totalPrice",
      header: () => <TotalPriceHeaderColumn />,
      cell: ({ getValue }) => formatPriceValue(getValue<string>()),
    }),
    createdAt: () => ({
      accessorKey: "createdAt",
      id: "createdAt",
      enableSorting: true,
      header: () => <CreatedAtHeaderColumn />,
    }),
    actions: (isLoading = false) => ({
      accessorKey: "actions",
      cell: ({ row }) => (
        <ActionHeaderColumn id={row.original.id ?? ""} isLoading={isLoading} />
      ),
    }),
    clientName: (isLoading = false) => ({
      accessorKey: "name",
      header: "Client Name",
      cell: ({ getValue }) => (
        <AnimatedCell isLoading={isLoading} value={getValue()}>
          {getValue<string>()}
        </AnimatedCell>
      ),
    }),
    email: (isLoading = false) => ({
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <AnimatedCell isLoading={isLoading} value={getValue()}>
          {getValue<string>()}
        </AnimatedCell>
      ),
    }),
    phone: (isLoading = false) => ({
      accessorKey: "phone",
      header: "Phone",
      cell: ({ getValue }) => (
        <AnimatedCell isLoading={isLoading} value={getValue()}>
          {getValue<string>()}
        </AnimatedCell>
      ),
    }),
  } as const satisfies Record<
    string,
    (isLoading?: boolean) => ColumnDef<T & { id?: string }>
  >;

  return register;
};
