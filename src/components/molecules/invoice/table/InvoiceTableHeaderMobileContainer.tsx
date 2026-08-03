import InvoiceTableCell from "@/components/atoms/invoice/InvoiceTableCell";
import { IOrderInvoiceDTO } from "@/modules/orders/application/dto/invoices.dto.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

const InvoiceTableHeaderMobileContainer = ({
  order,
}: {
  order: IOrderInvoiceDTO;
}) => {
  return (
    <tr className="min-[420px]:h-10 ">
      <InvoiceTableCell data-label={"Service"}>
        {order.service?.name}
      </InvoiceTableCell>
      <InvoiceTableCell data-label={"Description"}>
        {order.requirements || order.service?.description || "N/A"}
      </InvoiceTableCell>
      <InvoiceTableCell data-label={"Quantity"}>x1</InvoiceTableCell>
      <InvoiceTableCell data-label={"SubTotal"}>
        {formatPriceValue(Number(order.initialPrice).toFixed(2))}
      </InvoiceTableCell>
    </tr>
  );
};

export default InvoiceTableHeaderMobileContainer;
