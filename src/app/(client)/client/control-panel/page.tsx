import ClientSidebar from "../../../../components/organisms/ClientSidebar";
import ClientPaneLayout from "@/components/templates/controlPanel/ControlPanelLayout";

const page = () => {
  return (
    <ClientPaneLayout>
      <div className="flex gap-2">
        <ClientSidebar />
        <div className="content bg-(--color-bg-section) w-full rounded-xl p-2">
          test
        </div>
      </div>
    </ClientPaneLayout>
  );
};

export default page;
