"use client";
import { useState } from "react";
import ServiceSummaryV2 from "../molecules/gants/ServiceSummaryV2";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";

interface Props {
  pieData: { name: string; value: number }[];
  orders: IServiceOrderTable[];
}

const ServiceOrderStatisticsInteractive: React.FC<Props> = ({
  pieData,
  orders,
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredOrders = selectedService
    ? orders.filter((o) => o.serviceName === selectedService)
    : orders;

  const sum = filteredOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  return (
    <div className="flex flex-col items-center w-full">
      <ServiceSummaryV2
        data={pieData}
        onSelectService={(name) => setSelectedService(name)}
      />

      <div className="mt-6 w-full max-w-4xl overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 text-center">
                <td className="border px-4 py-2">{o.id}</td>
                <td className="border px-4 py-2">{o.serviceName}</td>
                <td className="border px-4 py-2">{o.clientName}</td>
                <td className="border px-4 py-2">{o.createdAt}</td>
                <td className="border px-4 py-2">{o.status}</td>
                <td className="border px-4 py-2">{o.totalPrice}</td>
              </tr>
            ))}
            <tr className=" px-4 py-2">
              <td className=" px-4 py-2" colSpan={5}>
                Total
              </td>
              <td className=" px-4 py-2">{formatPriceValue(sum)}</td>
            </tr>
          </tbody>
        </table>
        {selectedService && (
          <div className="mt-2 text-gray-600">
            Showing orders for: <b>{selectedService}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceOrderStatisticsInteractive;
