import { Circle, PlayCircle, CheckCircle, Activity } from "lucide-react";
import { FC } from "react";

interface StatusIconProps {
  className?: string;
}

export const STATUS_TASKS_ICON_MAP: Record<
  string,
  { Icon: FC<StatusIconProps>; colorClass: string; animated?: boolean }
> = {
  "not started": { Icon: Circle, colorClass: "text-gray-500" },
  "in progress": {
    Icon: PlayCircle,
    colorClass: "text-yellow-500",
    animated: true,
  },
  tested: { Icon: Activity, colorClass: "text-blue-500", animated: true },
  done: { Icon: CheckCircle, colorClass: "text-green-500" },
};
