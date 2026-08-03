import { FC } from "react";

interface HeaderColumnItemProps {
  checkIfIsSelected: boolean;
  filteredHandle: () => void;
  value: string;
  statusCounts: number | 0;
}

const HeaderColumnListItem: FC<HeaderColumnItemProps> = ({
  checkIfIsSelected,
  filteredHandle,
  value,
  statusCounts,
}) => {
  return (
    <li
      className={`flex gap-1 justify-between items-center hover:text-gray-400 border border-transparent hover:border hover:border-gray-400 rounded-lg py-1 px-4 pl-2 pr-6 cursor-pointer relative ${
        checkIfIsSelected
          ? "font-semibold after:absolute after:right-2 hover:after:content-['x'] after:text-red-500"
          : ""
      } `}
      onClick={filteredHandle}
    >
      <div className="flex justify-between gap-4 min-w-full">
        <span>{value}</span>
        <div
          className={`w-6 h-6 flex justify-center items-center border rounded-sm`}
        >
          <div className="">{statusCounts ?? 0}</div>
        </div>
      </div>
    </li>
  );
};

export default HeaderColumnListItem;
