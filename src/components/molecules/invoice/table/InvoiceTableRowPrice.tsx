import InvoiceTableCell from "@/components/atoms/invoice/InvoiceTableCell";
import { cn } from "@/lib/utils";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

const InvoiceTableRowPrice = ({
  description,
  price,
  isTotal,
}: {
  description: string;
  price: number;
  isTotal?: boolean;
}) => {
  return (
    <tr
      className={cn(
        "max-[420px]:flex border-0 border-b-0 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact] overflow-hidden"
      )}
    >
      <InvoiceTableCell
        className={`font-semibold max-[420px]:text-center! h-10 ${
          isTotal
            ? "rounded-bl-lg bg-blue-300 print:bg-blue-300 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
            : "bg-blue-200 print:bg-blue-200 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
        }`}
        colSpan={3}
        data-label={description}
      >
        <span className="max-[420px]:hidden">{description}</span>
      </InvoiceTableCell>
      <InvoiceTableCell
        className={`font-semibold text-center h-10 ${
          isTotal
            ? "rounded-br-lg bg-blue-300 print:bg-blue-300 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
            : "bg-blue-200 print:bg-blue-200 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
        }`}
        colSpan={1}
      >
        {formatPriceValue(Number(price))}
      </InvoiceTableCell>
    </tr>
  );
};

export default InvoiceTableRowPrice;
