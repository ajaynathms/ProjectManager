export interface UserModel {
    userId: Number
    firstName: String
    lastName: String
    employeeId: Number
    projectId: Number
    taskId: Number
}

export interface ProjectModel {
    projectId: Number
    project: String
    startDate: String
    endDate: String
    priority: Number
    manager: Number
    managerName: String
}

export interface TaskModel {
    taskId: Number
    parentId: Number
    projectId: Number
    task: String
    priority: Number
    startDate: String
    endDate: String
    status: String
}

export interface ParentTaskModel {
    parentId: Number
    parentTask: String
}