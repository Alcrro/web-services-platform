import { ReactNode } from "react";
import style from "./controlPanelLayout.module.scss";
import ControlPanelNavbar from "@/components/organisms/ControlPanelNavbar";

const ClientPaneLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={style.mainContent}>
      <ControlPanelNavbar />
      <div className={`${style.main} flex-1`}>{children}</div>
    </main>
  );
};

export default ClientPaneLayout;
