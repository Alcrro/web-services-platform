import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DynamicFeature from "@/components/organisms/DynamicFeature";
import SectionTabs from "@/components/organisms/SectionTabs";

interface PageProps {
  params: Promise<{ features: string[] }>;
  searchParams?: Promise<Record<string, string[]>>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const features = (await params).features;
  const sParams = (await searchParams) || {};
  const section = features[0];
  const isDetailRoute = features[1] === "id";

  return (
    <div className="w-full text-(--color-text) flex flex-col gap-4 py-4 px-2 bg-(--color-bg-section) rounded-xl">
      <div className="breadcrumbs">
        <Breadcrumbs />
      </div>
      {!isDetailRoute && <SectionTabs section={section} />}
      <DynamicFeature features={features} searchParams={sParams} />
    </div>
  );
};

export default page;
