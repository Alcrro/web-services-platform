import { IStatusMapperType } from "@/modules/orders/domain/types/order.types";
import {
  PlusCircle,
  Loader,
  MessageCircle,
  CheckCircle,
  Check,
} from "lucide-react";

const statusIcons = {
  new: PlusCircle,
  "in progress": Loader,
  "in discussion": MessageCircle,
  approved: CheckCircle,
  done: Check,
};
export function StatusIcon(status: IStatusMapperType) {
  if (!status) return;
  const Icon = statusIcons[status];
  return <Icon size={20} className="text-blue-500" />;
}
