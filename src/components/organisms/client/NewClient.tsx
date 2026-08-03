import style from "@/components/styles/clientContainerForm.module.scss";
import Button from "@/shared/ui/Button";
import ClientForm from "@/components/atoms/form/ClientForm";
import ClientFields from "@/components/molecules/service/servicesConifigurator/ClientFields";

const NewClient = () => {
  return (
    <ClientForm>
      <div className={style.client_form_container}>
        <ClientFields />
      </div>

      <div className="btn btn_submit p-2 mt-4">
        <Button variant="primary" className="w-full mx-auto max-w-[140px]">
          Submit
        </Button>
      </div>
    </ClientForm>
  );
};

export default NewClient;
