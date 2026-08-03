"use client";
import { addClientApi } from "@/services/api/client/clientApi";
import DefaultForm from "@/shared/ui/DefaultForm";
import { FormEvent, ReactNode } from "react";

const ClientForm = ({ children }: { children: ReactNode }) => {
  const clientSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formEn = Object.fromEntries(form.entries());

    try {
      const result = await addClientApi(formEn);

      e.currentTarget.reset(); // resetează form după submit
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DefaultForm onSubmit={(e) => clientSubmit(e)} className="p-4">
      {children}
    </DefaultForm>
  );
};

export default ClientForm;
