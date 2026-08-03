import DefaultFormLabel from "../../../../shared/ui/DefaultFormLabel";
import { clientFields } from "@/shared/data/consts/clientFormFieldData";

const ClientFields = () => {
  return clientFields.map((field) => (
    <DefaultFormLabel
      key={field.key}
      htmlFor={field.key}
      label={field.label}
      type={field.type || "text"}
      placeholder={field.placeholder}
      name={field.key}
      required={field.required}
      className="bg-(--color-bg) p-1 rounded-lg"
    />
  ));
};

export default ClientFields;
