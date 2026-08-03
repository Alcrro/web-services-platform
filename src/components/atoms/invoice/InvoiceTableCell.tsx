// components/atoms/invoice/InvoiceTableCell.tsx

import { cn } from "@/lib/utils";

interface Props extends React.TdHTMLAttributes<HTMLTableCellElement> {
  bold?: boolean;
}

const InvoiceTableCell: React.FC<Props> = ({
  bold,
  className,
  children,
  ...props
}) => {
  return (
    <td className={cn(" px-2 py-1", bold && "font-bold", className)} {...props}>
      {children}
    </td>
  );
};

export default InvoiceTableCell;
