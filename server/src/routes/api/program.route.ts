import * as express from 'express';
import { program } from '../../controllers'; 
import isAuth, { hasValidRole } from '../../middleware/auth.middleware';
import { UserTypeEnum } from '../../types';

const router = express.Router();

// get all programs by admin
router.route('/')
  .post(isAuth, hasValidRole([UserTypeEnum.ADMIN]), program.create)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN, UserTypeEnum.TEAMLEADER]), program.getAll);

// Get, update, and delete a program by ID
router.route('/:id')
  .all(isAuth)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN, UserTypeEnum.TEAMLEADER]), program.getById)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN]), program.update)
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), program.delete);

export default router;
