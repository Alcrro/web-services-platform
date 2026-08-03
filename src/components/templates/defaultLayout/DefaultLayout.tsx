import { ReactNode } from "react";
import style from "../../styles/defaultLayout.module.scss";
import Footer from "@/components/organisms/Footer";
import PublicHeader from "@/components/organisms/PublicHeader";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className={style.mainContent}>
        <PublicHeader />
        <div className={`${style.main} flex-1 px-2`}>{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default DefaultLayout;
