import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DynamicFeature from "@/components/organisms/DynamicFeature";
import SectionTabs from "@/components/organisms/SectionTabs";
import OrderScopeTabs from "@/components/organisms/OrderScopeTabs";

interface PageProps {
  params: Promise<{ features: string[] }>;
  searchParams?: Promise<Record<string, string[]>>;
}

// Sub-routes that are scoped to a specific order (have /id/[orderId] inside)
const ORDER_SCOPE_ROUTES = ["extend", "discussions"];

const page = async ({ params, searchParams }: PageProps) => {
  const features = (await params).features;
  const sParams = (await searchParams) || {};
  const section = features[0];

  // Redirect /orders/discussions → /orders/discussions/view
  if (section === "orders" && features[1] === "discussions" && !features[2]) {
    redirect("/administrator/control-panel/orders/discussions/view");
  }

  // orders/id/[id] — direct detail
  const isDirectDetail = features[1] === "id";
  // orders/extend/id/[id] or orders/discussions/id/[id]
  const isOrderScope = section === "orders" && ORDER_SCOPE_ROUTES.includes(features[1]) && features[2] === "id";
  const orderId = isOrderScope ? features[3] : undefined;

  return (
    <div className="w-full text-(--color-text) flex flex-col gap-4 py-4 px-2 bg-(--color-bg-section) rounded-xl">
      <div className="breadcrumbs">
        <Breadcrumbs />
      </div>
      {isOrderScope && orderId
        ? <OrderScopeTabs orderId={orderId} active={features[1] as "extend" | "discussions"} />
        : !isDirectDetail && <SectionTabs section={section} />
      }
      <DynamicFeature features={features} searchParams={sParams} />
    </div>
  );
};

export default page;
