// components/molecules/invoice/InvoiceFeatureRows.tsx

import InvoiceTableCell from "@/components/atoms/invoice/InvoiceTableCell";
import { IServiceOrderItem } from "@/modules/orders/domain/types/order.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";
import style from "../../../components/styles/invoiceFeatureRows.module.scss";
import React from "react";

interface Props {
  includedFeatures?: IServiceOrderItem[];
  extraFeatures?: IServiceOrderItem[];
}

const InvoiceFeatureRows: React.FC<Props> = ({
  includedFeatures = [],
  extraFeatures = [],
}) => {
  return (
    <>
      {includedFeatures.length > 0 && (
        <>
          <tr className="bg-gray-100 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact] text-center h-10">
            <InvoiceTableCell className="font-semibold " colSpan={4}>
              Features included
            </InvoiceTableCell>
          </tr>
          {includedFeatures.map((f, i) => (
            <tr key={i} className={`${style.tr} min-[420px]:h-10`}>
              <InvoiceTableCell
                colSpan={2}
                className={`${style.td} max-[420px]:text-center! `}
                data-label="name:"
              >
                <span className="text-end">
                  {i + 1}. {f.name}
                </span>
              </InvoiceTableCell>
              <InvoiceTableCell className="text-center" data-label="qty:">
                x{f.quantity}
              </InvoiceTableCell>
              <InvoiceTableCell className="text-center" data-label="price:">
                {f.showPrice ? f.unitPrice : "-"}
              </InvoiceTableCell>
            </tr>
          ))}
        </>
      )}

      {extraFeatures.length > 0 && (
        <React.Fragment>
          <tr className="bg-gray-100 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact] text-center h-10">
            <InvoiceTableCell className="font-semibold" colSpan={4}>
              Extra Features
            </InvoiceTableCell>
          </tr>
          {extraFeatures.map((item, i) => (
            <tr key={i} className="min-[420px]:h-10">
              <InvoiceTableCell
                colSpan={2}
                className="max-[420px]:text-center!"
                data-label="name:"
              >
                <div data-cell="name:"></div>
                <span className="text-end">{item.name}</span>
              </InvoiceTableCell>

              <InvoiceTableCell className="text-center" data-label="qty:">
                x{item.quantity}
              </InvoiceTableCell>
              <InvoiceTableCell className="text-right" data-label="price:">
                {formatPriceValue(Number(item.unitPrice).toFixed(2))}
              </InvoiceTableCell>
            </tr>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

export default InvoiceFeatureRows;
