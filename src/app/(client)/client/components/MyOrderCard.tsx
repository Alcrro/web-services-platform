import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";
import { formatPriceValue } from "@/shared/utils/formatServicesPrice";
import { StatusIcon } from "@/shared/utils/statusIcon";
import { FC } from "react";

interface IMyOrderCardProps {
  order: IServiceOrderTable;
}
const MyOrderCard: FC<IMyOrderCardProps> = ({ order }) => {
  const icon = StatusIcon(order.status);
  return (
    <div
      className={`flex flex-col justify-between p-2 shadow bg-(--color-bg) rounded-lg min-h-32 transform transition-transform duration-500 ease-out hover:scale-110 `}
      key={order.id}
    >
      <div className="flex justify-between">
        <div className="service_status" title={order.status}>
          {icon}
        </div>
        <div className="service_name">{order.serviceName}</div>
        <div className="service_name">#{order.orderNo ?? " no Order"}</div>
      </div>
      <div className="client_name capitalize">{order.clientName}</div>
      <div className="service_total ml-auto">
        {formatPriceValue(order.totalPrice)}
      </div>
    </div>
  );
};

export default MyOrderCard;
