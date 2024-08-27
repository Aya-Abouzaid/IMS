import { NextFunction, Request, Response } from 'express';
import TaskModel from '../models/task.model';
import { HttpError } from '../middleware/error.middleware';
import { HttpStatus } from '../types';

class TaskController {
  
  // Create a new task
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTask = new TaskModel({
        ...req.body,
        createdBy: req.user.id, // Assuming req.user is populated with the current user
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newTask.save();
      return res.status(HttpStatus.OK).send({ message: 'Task created successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to create task, please try again!', e.statusCode || 500));
    }
  };

  // Update an existing task
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { ...req.body, updatedBy: req.user.id, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedTask) {
        throw new HttpError('Task not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Task updated successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to update task, please try again!', e.statusCode || 500));
    }
  };

  // Delete a task
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new HttpError('Task not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Task deleted successfully' });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to delete task, please try again!', e.statusCode || 500));
    }
  };

  // Get a task by ID
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const task = await TaskModel.findById(id).populate('assignedTo').populate('createdBy').populate('updatedBy');
      if (!task) {
        throw new HttpError('Task not found', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).send({ message: 'Task retrieved successfully', task });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to retrieve task, please try again!', e.statusCode || 500));
    }
  };

  // Get all tasks
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await TaskModel.find().populate('assignedTo').populate('createdBy').populate('updatedBy');
      return res.status(HttpStatus.OK).send({ message: 'Tasks retrieved successfully', tasks });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to retrieve tasks, please try again!', e.statusCode || 500));
    }
  };

  // Assign task to a trainee
  assignToTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Task ID
    const { traineeId } = req.body; // Trainee ID, should be provided in the request body

    try {
      // Find the task by ID and update the assignedTo field
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { assignedTo: traineeId, updatedAt: new Date(), updatedBy: req.user.id }, // Update the assignedTo field and other metadata
        { new: true }
      );

      if (!updatedTask) {
        throw new HttpError('Task not found', HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).send({ message: 'Task assigned to trainee successfully', task: updatedTask });
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to assign task to trainee, please try again!', e.statusCode || 500));
    }
  };
}

export default new TaskController();
