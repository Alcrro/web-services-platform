import ClientSidebar from "../../../../../components/organisms/ClientSidebar";
import ClientPaneLayout from "@/components/templates/controlPanel/ControlPanelLayout";
import MyOrders from "../../components/MyOrders";
import { getDynamicComponent } from "@/shared/utils/getDynamicComponent";
import ActiveProjects from "../../components/activeProjects/ActiveProjects";
import ProjectTasks from "../../components/tasks/ProjectTasks";
import Dashboard from "../../components/dashboard/Dashboard";

type AnyComponent = React.FC<Record<string, unknown>>;

interface ComponentMapper {
  [key: string]: AnyComponent | ComponentMapper;
}
const clientControlPanelMapper: ComponentMapper = {
  dashboard: Dashboard,
  services: { orders: MyOrders },
  projects: { active: ActiveProjects, tasks: ProjectTasks },
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<Record<string, string[]>>;
}

const page = async ({ searchParams, params }: PageProps) => {
  const slug = (await params).slug;
  const searchPar = await searchParams;

  const paramsSlug = slug || [];
  let taskId: string | undefined;
  if (paramsSlug.length >= 3 && paramsSlug[paramsSlug.length - 2] === "tasks") {
    taskId = paramsSlug[paramsSlug.length - 1]; // last segment = task ID
  }

  const { component: DynamicComponent } = getDynamicComponent(
    clientControlPanelMapper,
    paramsSlug
  );

  return (
    <ClientPaneLayout>
      <div className="flex gap-2 max-[1000px]:flex-wrap">
        <ClientSidebar />
        <div className="flex flex-col gap-2 content bg-(--color-bg-section) w-full rounded-xl p-2">
          {!DynamicComponent ? (
            <div className="flex justify-center items-center h-full">
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
    </ClientPaneLayout>
  );
};

export default page;
