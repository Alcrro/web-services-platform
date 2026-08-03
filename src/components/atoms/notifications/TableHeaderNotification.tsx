import { CircleIcon } from "lucide-react";

const TableHeaderNotification = () => {
  return (
    <div className="flex justify-center absolute -top-4 left-1/2 -translate-x-1/2">
      <CircleIcon className="bg-red-500 size-4 rounded-full border-transparent text-transparent absolute" />
      <span className="absolute flex items-center -top-0.5">1</span>
    </div>
  );
};

export default TableHeaderNotification;
