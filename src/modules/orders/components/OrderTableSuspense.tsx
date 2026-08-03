import LoadingOrderTable from "@/modules/clients/components/LoadingOrderTable";
import OrdersTable from "./OrdersTable";
import { Suspense } from "react";

const OrderTableWithSuspense = ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) => {
  return (
    <Suspense fallback={<LoadingOrderTable searchParams={searchParams} />}>
      <OrdersTable searchParams={searchParams} />
    </Suspense>
  );
};

export default OrderTableWithSuspense;
