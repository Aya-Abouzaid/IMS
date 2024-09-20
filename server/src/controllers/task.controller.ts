
import TaskData from '../persistance/task.persistence';
import { Request, Response, NextFunction } from 'express';
import { ITaskCreate, ITaskUpdate } from '../types';

const taskData = new TaskData();

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task: ITaskCreate = req.body;
    const createdTask = await taskData.create(task);
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskData.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskData.getById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedTask = await taskData.updateById(req.params.id, req.body as ITaskUpdate);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await taskData.deleteById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};