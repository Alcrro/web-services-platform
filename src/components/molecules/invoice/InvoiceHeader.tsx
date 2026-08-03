import CompanyLogo from "@/components/atoms/company/CompanyLogo";
import InvoiceTitle from "@/components/atoms/invoice/InvoiceTitle";

const InvoiceHeader = ({ img }: { img?: string }) => (
  <header className="flex justify-between items-center mb-10">
    <InvoiceTitle />
    {!img ? (
      <div className="bg-blue-300 uppercase text-black p-4 rounded-2xl print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
        alcrro
      </div>
    ) : (
      <CompanyLogo src={true}></CompanyLogo>
    )}
  </header>
);

export default InvoiceHeader;
