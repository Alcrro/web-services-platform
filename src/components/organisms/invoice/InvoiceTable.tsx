import styles from "../../styles/invoiceTabe.module.scss";
import InvoiceTableCell from "@/components/atoms/invoice/InvoiceTableCell";
import InvoiceFeatureRows from "../../molecules/invoice/InvoiceFeaturerows";
import InvoiceTableHeaderContainer from "../../molecules/invoice/table/InvoiceTableHeaderContainer";
import InvoiceTableHeaderMobileContainer from "../../molecules/invoice/table/InvoiceTableHeaderMobileContainer";
import InvoiceTableRowPrice from "../../molecules/invoice/table/InvoiceTableRowPrice";
import { IOrderInvoiceDTO } from "@/modules/orders/application/dto/invoices.dto.types";

interface IOrderInvoiceProps {
  order: IOrderInvoiceDTO;
}
const InvoiceTable: React.FC<IOrderInvoiceProps> = ({ order }) => {
  if (!order.items) return [];
  const includedFeatures = order.items
    .filter((item) => item.type === "STANDARD")
    .map((item) => item);
  const extraFeatures = order.items
    .filter((item) => item.type === "OPTIONAL")
    .map((item) => item);
  const otherFeatures = order.items
    .filter((item) => item.type === "OTHER")
    .map((item) => item);

  return (
    <table className={`${styles.tableWrapper} w-full border-collapse text-sm`}>
      <InvoiceTableHeaderContainer />
      <tbody>
        {/* Main service */}
        <InvoiceTableHeaderMobileContainer order={order} />
        {/* Features + Extra Items */}
        <InvoiceFeatureRows
          includedFeatures={includedFeatures}
          extraFeatures={extraFeatures}
        />
        <InvoiceTableRowPrice
          description="SubTotal"
          price={order.extraFeaturesTotal}
          isTotal={false}
        />
        {otherFeatures.length >= 1 && (
          <tr className="bg-gray-100 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
            <InvoiceTableCell className="font-semibold " colSpan={4}>
              Extra Included
            </InvoiceTableCell>
          </tr>
        )}
        <InvoiceTableRowPrice
          description="Total"
          price={Number(order.initialPrice + order.extraFeaturesTotal)}
          isTotal={true}
        />
      </tbody>
    </table>
  );
};

export default InvoiceTable;
