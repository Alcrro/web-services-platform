import { ITask } from "../../domain/types/task.types";

export type TaskStatusMapperType =
  (typeof TaskStatusMapperDTO)[keyof typeof TaskStatusMapperDTO];

export const TaskStatusMapperDTO = {
  NOT_STARTED: "not started",
  IN_PROGRESS: "in progress",
  TESTED: "tested",
  DONE: "done",
} as const;

export const TaskStatusMapperFrontendURL = {
  all: "all",
  "not-started": "not started",
  "in-progress": "in progress",
  test: "tested",
  done: "done",
} as const;
export const TaskStatusFilter = {
  "not-started": "NOT_STARTED",
  "in-progress": "IN_PROGRESS",
  tested: "TESTED",
  done: "DONE",
} as const;

export type ITaskDTO = Omit<ITask, "status"> & {
  status: TaskStatusMapperType;
};
