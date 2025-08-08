

export interface TaskData {
    taskId: string;
    taskName: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    estimation: number;
    startDate: string;
    endDate: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    createdAt: string;
    updatedAt: string;
    boardId: string;
    boardName: string;
    projectId: string;
    projectName: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
}
