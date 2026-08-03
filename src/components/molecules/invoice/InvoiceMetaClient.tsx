import InvoiceMetaDescription from "@/components/atoms/invoice/InvoiceMetaDescription";
import { IClient } from "@/modules/clients/domain/types/client.types";
import { FC } from "react";

const InvoiceMetaClient: FC<IClient> = ({ name, email, phone }) => {
  return (
    <>
      <InvoiceMetaDescription label="Client" description={name} />
      <InvoiceMetaDescription label="Email" description={email} />
      <InvoiceMetaDescription label="Phone" description={phone ?? "N/A"} />
    </>
  );
};

export default InvoiceMetaClient;
