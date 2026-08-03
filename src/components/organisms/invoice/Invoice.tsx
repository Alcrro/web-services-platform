import InvoiceHeader from "../../molecules/invoice/InvoiceHeader";
import PrintButton from "@/components/atoms/buttons/PrintButton";
import { companyDetails } from "@/shared/data/consts/companyDetails/companyDetails";
import InvoiceMeta from "@/components/organisms/invoice/InvoiceMeta";
import InvoiceTable from "@/components/organisms/invoice/InvoiceTable";
import { IServiceOrderDTO } from "@/modules/orders/application/dto/order.dto.types";

const Invoice = ({ order }: { order: IServiceOrderDTO }) => {
  if (!order.client) return null;
  return (
    <div className="flex flex-col relative p-2 sm:p-10 text-(--color-border) bg-white w-full min-h-full">
      <style>{`
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
        th { background-color: #f5f5f5; }
        
        tfoot td { font-weight: bold; }
        .total { font-size: 18px; color: #1a73e8; }
      `}</style>

      <InvoiceHeader img={companyDetails.logo} />
      <InvoiceMeta client={order.client} orderId={order.id} />
      <div className="flex-1 relative">
        <InvoiceTable order={order} />
        {/* Fixed footer for print */}
        <div className=" py-2 text-center text-sm print:fixed print:bottom-0 print:left-0 print:right-0 print:w-full print:text-center print:p-2 print:text-sm">
          Aceasta este o factură generată automat. Mulțumim pentru colaborare!
        </div>
      </div>
      <PrintButton />
    </div>
  );
};

export default Invoice;
