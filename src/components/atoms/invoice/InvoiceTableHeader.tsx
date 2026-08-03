const InvoiceTableHeader = ({
  description,
  className,
}: {
  description: string;
  className?: string;
}) => {
  return <th className={` px-2 py-1 ${className}`}>{description}</th>;
};

export default InvoiceTableHeader;
