import { IClient } from "@/modules/clients/domain/types/client.types";
import { FC } from "react";
import InvoiceMetaClient from "../../molecules/invoice/InvoiceMetaClient";
import InvoiceMetaCompany from "../../molecules/invoice/InvoiceMetaCompany";
type InvoiceMetaProps = {
  client: IClient;

  orderId: string;
};
const InvoiceMeta: FC<InvoiceMetaProps> = ({ client, orderId }) => {
  return (
    <div className="flex justify-between items-center flex-wrap print:flex-nowrap">
      <section className="mt-5">
        <InvoiceMetaClient id={""} name={client.name} email={client.email} />
        <p>
          <strong>OrderId:</strong>
          {orderId}
        </p>
      </section>
      <section className="mt-5">
        <InvoiceMetaCompany />
      </section>
    </div>
  );
};

export default InvoiceMeta;
