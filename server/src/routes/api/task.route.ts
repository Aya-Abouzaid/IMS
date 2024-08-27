import * as express from 'express';
import { task } from '../../controllers';
import isAuth, { hasValidRole } from '../../middleware/auth.middleware';
import { UserTypeEnum } from '../../types';

const router = express.Router();

// Admins and Team Leaders can create tasks and get all tasks
router.route('/')
  .post(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), task.create)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN, UserTypeEnum.TEAMLEADER]), task.getAll);

// Get, update, and delete a specific task by ID
router.route('/:id')
  .all(isAuth)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN, UserTypeEnum.TEAMLEADER]), task.getById)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), task.update)
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), task.delete);

// Assign task to a trainee by a team leader
router.route('/:id/assign')
  .post(isAuth, hasValidRole([UserTypeEnum.TEAMLEADER]), task.assignToTrainee);

export default router;
