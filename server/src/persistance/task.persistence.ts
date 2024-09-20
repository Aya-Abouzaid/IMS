// persistence/task.persistence.ts
import  TaskModel  from '../models/task.model';
import { HttpError } from '../middleware/error.middleware';
import { ITaskCreate, ITaskUpdate, HttpStatus } from '../types';

class TaskData {
  convertToTaskOutDTO = (task: any) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    assignedTo: task.assignedTo,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });

  create = async (task: ITaskCreate) => {
    const newTask = new TaskModel(task);
    await newTask.save();
    return this.convertToTaskOutDTO(newTask);
  };

  updateById = async (id: string, task: ITaskUpdate) => {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, task, { new: true });
    if (!updatedTask) {
      throw new HttpError('Task not found!', HttpStatus.NOT_FOUND);
    }
    return this.convertToTaskOutDTO(updatedTask);
  };

  getById = async (id: string) => {
    const task = await TaskModel.findById(id);
    if (task) {
      return this.convertToTaskOutDTO(task);
    }
    throw new HttpError('Task not found!', HttpStatus.NOT_FOUND);
  };

  getAll = async () => {
    const tasks = await TaskModel.find();
    return tasks.map(this.convertToTaskOutDTO);
  };

  deleteById = async (id: string) => {
    const result = await TaskModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError('Task not found!', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }
}

export default TaskData;
