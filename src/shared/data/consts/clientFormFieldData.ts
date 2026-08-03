export interface ClientField {
  key: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
}

export const clientFields: ClientField[] = [
  { key: "name", label: "Full Name", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", type: "tel" },
];
