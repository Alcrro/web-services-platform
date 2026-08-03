import InvoiceTableHeader from "@/components/atoms/invoice/InvoiceTableHeader";

const InvoiceTableHeaderContainer = () => {
  const tableHeaderArray = [
    "Serviciu / Task",
    "Descriere",
    "Quantity",
    "Price",
  ];
  return (
    <thead className="bg-gray-100 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact] overflow-hidden h-10">
      <tr className="">
        {tableHeaderArray.map((th, idx) => (
          <InvoiceTableHeader
            key={th}
            description={th}
            className={` ${
              idx === 0
                ? "rounded-tl-lg"
                : idx === tableHeaderArray.length - 1
                ? "rounded-tr-lg"
                : ""
            }`}
          />
        ))}
      </tr>
    </thead>
  );
};

export default InvoiceTableHeaderContainer;
