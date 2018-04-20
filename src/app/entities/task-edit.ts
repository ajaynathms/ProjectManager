import { TaskModel } from "./task";
import { Status } from "./status";

export interface TaskEdit {
    status: Status;
    task: TaskModel;
  }