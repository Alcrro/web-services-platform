import InvoiceMetaDescription from "@/components/atoms/invoice/InvoiceMetaDescription";
import { companyDetails } from "@/shared/data/consts/companyDetails/companyDetails";

const InvoiceMetaCompany = () => {
  const { name, email, phone, CUI } = companyDetails;
  return (
    <>
      <InvoiceMetaDescription label="Company" description={name} />
      <InvoiceMetaDescription label="Email" description={email} />
      <InvoiceMetaDescription label="Phone" description={phone ?? "N/A"} />
      <InvoiceMetaDescription label="CUI" description={CUI} />
    </>
  );
};

export default InvoiceMetaCompany;
