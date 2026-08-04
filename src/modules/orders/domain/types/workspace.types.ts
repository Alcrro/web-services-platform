import type { IServiceOrderStatus } from "./order.types";
import type { IFeatureType } from "@/modules/services/domain/types/service.types";
import type { TaskStatusType } from "@/modules/tasks/domain/types/task.types";

export interface IWorkspaceProjectListItem {
  id: string;
  orderNo: number;
  projectName: string;
  serviceName: string;
  status: IServiceOrderStatus;
  createdAt: Date;
  progressPercent: number;
  totalTasks: number;
  doneTasks: number;
}

export interface IWorkspaceTaskComment {
  id: string;
  authorId: string;
  message: string;
  createdAt: Date;
}

export interface IWorkspaceTask {
  id: string;
  title: string;
  status: TaskStatusType;
  assigneeName?: string;
  comments: IWorkspaceTaskComment[];
}

export interface IWorkspaceFeatureGroup {
  id: string;
  name: string;
  description?: string | null;
  type: IFeatureType;
  tasks: IWorkspaceTask[];
  doneTasks: number;
  totalTasks: number;
}

export interface IWorkspaceStandardFeature {
  name: string;
  description?: string | null;
  hours: number;
  isIncluded: boolean;
}

export interface IWorkspaceProjectDetail {
  id: string;
  orderNo: number;
  projectName: string;
  serviceName: string;
  serviceDescription: string;
  techStack: string[];
  requirements?: string | null;
  status: IServiceOrderStatus;
  createdAt: Date;
  updatedAt?: Date;
  progressPercent: number;
  totalTasks: number;
  doneTasks: number;
  standardFeatures: IWorkspaceStandardFeature[];
  featureGroups: IWorkspaceFeatureGroup[];
  generalTasks: IWorkspaceTask[];
}
