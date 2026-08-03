import OrdersTable from "@/modules/orders/components/OrdersTable";

export interface OrderTablePageProps {
  searchParams?: Record<string, string | string[]>;
}
const OrderTablePage = ({ searchParams }: OrderTablePageProps) => {
  const params = searchParams || {};
  return <OrdersTable searchParams={params} />;
};

export default OrderTablePage;
