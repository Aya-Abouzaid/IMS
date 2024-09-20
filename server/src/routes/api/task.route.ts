import * as express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../../controllers/task.controller';
import isAuth, { hasValidRole } from '../../middleware/auth.middleware';
import { UserTypeEnum } from '../../types';

const router = express.Router();

// Admin and team leaders can create tasks
router.route('/')
  .post(createTask)
  .get(getAllTasks);

// Update, delete, and get a task by ID
router.route('/:id')
  .all(isAuth)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), updateTask)
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), deleteTask)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), getTaskById);

export default router;
