import styles from "@/components/styles/FAQ.module.scss";
import Title from "@/shared/ui/Title";
const HomeFaqTitle = () => {
  return (
    <Title as={"h2"} className={styles.heading}>
      Frequently Asked Questions
    </Title>
  );
};

export default HomeFaqTitle;
