// import Invoice from "@/components/organisms/invoice/Invoice";
// import { OrdersAction } from "@/modules/orders/application/orders.action";

export default async function InvoicePDFPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // const orderAction = new OrdersAction();
  // const order = await orderAction.getOneOrderInvoice(id);

  // if (!order) return <div>Order not found</div>;

  return (
    <>
      {/* <Invoice order={order} />; */}
      invoice {id}
    </>
  );
}
