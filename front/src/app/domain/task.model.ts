export interface Task {
  id?: string;
  name: string;
  desc: string;
  completed: boolean;
  priority: number;
  dueDate?: Date;
  reminder?: Date;
  remark?: string;
  createdDate: Date;
  ownerId?: string;
  participantIds: string[];
  taskListId: string;
}
