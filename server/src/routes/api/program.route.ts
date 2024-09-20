import { program } from 'controllers';
import * as express from 'express';
import isAuth, { hasValidRole } from 'middleware/auth.middleware';
import { UserTypeEnum } from 'types';


const router = express.Router();

// Get all programs by admin
router.route('/')
  .post(program.create)
  .get(program.getAll);

// Get, update, and delete a program by ID
router.route('/:id')
  .all(isAuth)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN, UserTypeEnum.TEAMLEADER]), program.getById)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN]), program.update)
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), program.deleteProgram);

export default router;
