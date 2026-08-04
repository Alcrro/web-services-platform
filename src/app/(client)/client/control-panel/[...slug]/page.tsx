import ClientSidebar from "../../../../../components/organisms/ClientSidebar";
import ClientPaneLayout from "@/components/templates/controlPanel/ControlPanelLayout";
import ClientSectionTabs from "@/components/organisms/ClientSectionTabs";
import { getDynamicComponent } from "@/shared/utils/getDynamicComponent";
import Dashboard from "../../components/dashboard/Dashboard";
import WorkspaceProjectList from "../../components/workspace/WorkspaceProjectList";
import WorkspaceProjectDetail from "../../components/workspace/WorkspaceProjectDetail";

type AnyComponent = React.FC<Record<string, unknown>>;

interface ComponentMapper {
  [key: string]: AnyComponent | ComponentMapper;
}

const clientControlPanelMapper: ComponentMapper = {
  dashboard: Dashboard,
  workspace: { list: WorkspaceProjectList, detail: WorkspaceProjectDetail },
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<Record<string, string[]>>;
}

const page = async ({ searchParams, params }: PageProps) => {
  const slug = (await params).slug;
  const searchPar = await searchParams;

  const paramsSlug = slug || [];
  const section = paramsSlug[0];

  let taskId: string | undefined;
  if (paramsSlug.length >= 3 && paramsSlug[paramsSlug.length - 2] === "tasks") {
    taskId = paramsSlug[paramsSlug.length - 1];
  }

  const { component: DynamicComponent } = getDynamicComponent(
    clientControlPanelMapper,
    paramsSlug
  );

  return (
    <ClientPaneLayout>
      <div className="flex gap-4 max-lg:flex-col lg:items-start">
        <ClientSidebar />
        <div className="flex-1 min-w-0 max-lg:w-full">
          <div className="w-full text-(--color-text) flex flex-col gap-4 py-4 px-2 bg-(--color-bg-section) rounded-xl">
            <ClientSectionTabs section={section} />
            {!DynamicComponent ? (
              <div className="flex justify-center items-center h-32 text-(--color-text-secondary) text-sm">
                Feature incoming...
              </div>
            ) : (
              <DynamicComponent
                {...(slug ? { params: slug } : {})}
                {...(searchParams ? { searchParams: searchPar } : {})}
                taskId={taskId}
              />
            )}
          </div>
        </div>
      </div>
    </ClientPaneLayout>
  );
};

export default page;
