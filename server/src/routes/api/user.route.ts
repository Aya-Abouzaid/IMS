import * as express from 'express';
import { user } from '../../controllers';
import isAuth, { hasValidRole } from '../../middleware/auth.middleware';
import {
  isUserValidForCreate, isUserValidForLogin, isValidKeyword,
} from '../../middleware';
import { uploadImages } from '../../middleware/file.middleware';
import { UserTypeEnum } from '../../types';


const router = express.Router();

// Admin 

router.post('/create-first-admin', (req, res, next) => {
  console.log('Received a request to create the first admin user');
  next();
}, user.createFirstAdmin);
 // No authentication required for this route
//admin and teamleaders can add trainees
router.route('/')
  .post(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), uploadImages('profiles').single('picture'), isUserValidForCreate, user.create)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN]), user.getAll);
  
// router.route('/filter')
//   .all(isAuth)

// router.route('/password-forget')
//   .put(isValidEmail, user.forgetPassword);

// router.route('/password-reset')
//   .put(isValidPassword, user.resetPassword);

router.route('/login')
  .post(isUserValidForLogin, user.login);

  //Update existing user admin and teamleader who can update 
router.route('/:id')
  .all(isAuth)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), user.update)
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), user.delete)
  .get(user.getById)



export default router;
