import type { IServiceOrderStatus } from "../domain/types/order.types";
import type {
  IWorkspaceFeatureGroup,
  IWorkspaceProjectDetail,
  IWorkspaceProjectListItem,
  IWorkspaceTask,
  IWorkspaceTaskComment,
} from "../domain/types/workspace.types";
import type { IFeatureType } from "@/modules/services/domain/types/service.types";
import type { TaskStatusType } from "@/modules/tasks/domain/types/task.types";

type PrismaTaskComment = {
  id: string;
  authorId: string;
  message: string;
  createdAt: Date;
};

type PrismaTask = {
  id: string;
  title: string;
  status: string;
  assignee: { name: string } | null;
  comments: PrismaTaskComment[];
};

type PrismaOrderItem = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  isDeleted: boolean;
  tasks: PrismaTask[];
};

type PrismaServiceFeature = {
  isIncluded: boolean;
  hours: number;
  feature: { name: string; description?: string | null } | null;
};

type PrismaWorkspaceOrder = {
  id: string;
  orderNo: number;
  projectName: string | null;
  requirements: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  service: {
    name: string;
    description: string;
    techStack: string[];
    serviceFeatures: PrismaServiceFeature[];
  };
  items: PrismaOrderItem[];
  tasks: PrismaTask[];
};

type PrismaListOrder = {
  id: string;
  orderNo: number;
  projectName: string | null;
  status: string;
  createdAt: Date;
  service: { name: string };
  tasks: { status: string }[];
  items: { tasks: { status: string }[] }[];
};

function calcProgress(tasks: { status: string }[]): {
  progressPercent: number;
  doneTasks: number;
  totalTasks: number;
} {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(
    (t) => t.status === "DONE" || t.status === "TESTED"
  ).length;
  const progressPercent =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  return { progressPercent, doneTasks, totalTasks };
}

function mapTask(t: PrismaTask): IWorkspaceTask {
  return {
    id: t.id,
    title: t.title,
    status: t.status as TaskStatusType,
    assigneeName: t.assignee?.name,
    comments: t.comments.map(
      (c): IWorkspaceTaskComment => ({
        id: c.id,
        authorId: c.authorId,
        message: c.message,
        createdAt: c.createdAt,
      })
    ),
  };
}

export function mapWorkspaceListItem(
  order: PrismaListOrder
): IWorkspaceProjectListItem {
  const allTasks = [
    ...order.tasks,
    ...order.items.flatMap((item) => item.tasks),
  ];
  const { progressPercent, doneTasks, totalTasks } = calcProgress(allTasks);

  return {
    id: order.id,
    orderNo: order.orderNo,
    projectName: order.projectName ?? order.service.name,
    serviceName: order.service.name,
    status: order.status as IServiceOrderStatus,
    createdAt: order.createdAt,
    progressPercent,
    totalTasks,
    doneTasks,
  };
}

export function mapWorkspaceDetail(
  order: PrismaWorkspaceOrder
): IWorkspaceProjectDetail {
  const featureGroups: IWorkspaceFeatureGroup[] = order.items.map((item) => {
    const { doneTasks, totalTasks } = calcProgress(item.tasks);
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type as IFeatureType,
      tasks: item.tasks.map(mapTask),
      doneTasks,
      totalTasks,
    };
  });

  const generalTasks: IWorkspaceTask[] = order.tasks.map(mapTask);

  const allTasks = [
    ...order.tasks,
    ...order.items.flatMap((item) => item.tasks),
  ];
  const { progressPercent, doneTasks, totalTasks } = calcProgress(allTasks);

  const standardFeatures = order.service.serviceFeatures
    .filter((sf) => sf.isIncluded && sf.feature)
    .map((sf) => ({
      name: sf.feature!.name,
      description: sf.feature!.description ?? null,
      hours: sf.hours,
      isIncluded: sf.isIncluded,
    }));

  return {
    id: order.id,
    orderNo: order.orderNo,
    projectName: order.projectName ?? order.service.name,
    serviceName: order.service.name,
    serviceDescription: order.service.description,
    techStack: order.service.techStack,
    requirements: order.requirements,
    status: order.status as IServiceOrderStatus,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    progressPercent,
    totalTasks,
    doneTasks,
    standardFeatures,
    featureGroups,
    generalTasks,
  };
}
