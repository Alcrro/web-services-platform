const InvoiceMetaDescription = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <p>
      <strong>{label}:</strong> {description}
    </p>
  );
};

export default InvoiceMetaDescription;
