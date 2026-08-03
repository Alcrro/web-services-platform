interface ContactValueProps {
  value: string | number;
}

const ContactValue: React.FC<ContactValueProps> = ({ value }) => {
  if (typeof value === "string" && value.includes(",")) {
    const parts = value.split(",");
    return (
      <div className="flex flex-col min-[420px]:text-left min-[420px]:pl-4">
        {parts.map((item, index) => (
          <span key={index} className="max-[420px]:text-center">
            {item.trim()}
            {index < parts.length - 1 ? "," : ""}
          </span>
        ))}
      </div>
    );
  }

  return <div className="min-[420px]:text-left min-[420px]:pl-4">{value}</div>;
};

export default ContactValue;
