
export interface TaskModel {
    Task_ID,Parent_ID?,Project_ID?,User_ID?: number;
    Parent_Name?,Project_Name?,TaskName?,User_Name?: string;
    Start_Date?,End_Date? :Date;
    Priority?:number;
    Status:boolean;
  }