import Title from "@/shared/ui/Title";
import Link from "next/link";

const page = async () => {
  return (
    <div className="dashboard">
      <Title as={"h3"}>Dashboard</Title>
      <ul>
        <li>
          <Link href={"control-panel/orders"}>Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
