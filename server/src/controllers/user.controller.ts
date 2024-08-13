/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, isPasswordValid } from '../util/hashing';
// import upload from '../middleware/img.middleware';
import { signUser } from '../util/auth.util';
import Env from '../../config';
import {
 UserData,
} from '../persistance';
import { HttpStatus, UserTypeEnum } from '../types';
import { generateEmail, sendEmail } from '../util/email.util';
import { HttpError } from '../middleware/error.middleware';
import { UserService } from '../services';

/**
 * @summary This class contain the middlewares that responsible for handle HTTP requests of User
 * @params Allof them receive the same arguments
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next function to call in the middleware chain.
 * @throws {Error} If an error occurs during the create operation.
 * @returns {void} This function does not return anything.
 * */
class UserController {
  private userService: any;

  private projectUserService: any;

  private findingService: any;

  private scenarioService: any;

  private projectService: any;

  private clientService: any;

  private vrtService: any;

  private orgService: any;

  // Inject needed dependencies of User Service
  constructor() {
    const userDataAccess = new UserData();
    this.userService = new UserService(userDataAccess);
  }

  isValidEmail = async (orgId: string, email: string) => {
    const org = await this.orgService.getById(orgId);
    const orgDomain = `${org.org.domain}.${org.org.tld}`;
    const emailDomain = email.split('@')[1];
    console.log(`Emails: ${orgId} | ${orgDomain} | ${emailDomain}`);
    return orgDomain === emailDomain;
  };

  generateUser = (body: any, fileName: string | undefined) => {
    console.log(`filename: ${fileName}`);
    if(fileName !== undefined){
      return {
        picture: fileName,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        type: body.type,
        orgId: body.orgId,
        clientId: body.clientId,
        passwordStatus: 'default',
        password: hashPassword(body.password),
        payload: uuidv4(),
      }
    }else {
      return {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        type: body.type,
        orgId: body.orgId,
        clientId: body.clientId,
        passwordStatus: 'default',
        password: hashPassword(body.password),
        payload: uuidv4(),
      }
    }
  };
      //create User
  create = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.user;
    try {
      if (user.type === UserTypeEnum.ADMIN  || user.type === UserTypeEnum.SADMIN) { 
        const newUser = this.generateUser(req.body, req.file?.filename);
        console.log(`Creating user with picture: ${newUser.picture}`);
        await this.userService.create({ ...newUser, createdBy: user.id});
        return res.status(HttpStatus.OK).send({ message: 'User created successfully' });
      }

      if (user.type === UserTypeEnum.TEAMLEADER) {
        const newTrainee = this.generateUser(req.body, req.file?.filename);
        await this.userService.create({ ...newTrainee, createdBy: user.id });
        return res.status(HttpStatus.OK).send({ message: 'Trainee created successfully' });
      }

    } catch (e: any) {
      next(new HttpError(e.message || 'Fail to add new User, please try again!', e.statusCode || 500));
    }
  };
  //Update Users
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req.user;
    try {
      if (user.type === UserTypeEnum.ADMIN || user.type === UserTypeEnum.SADMIN) {
        await this.userService.updateById(id, req.body);
        return res.status(HttpStatus.OK).send({ message: 'User updated successfully' });
      }
      if (user.type === UserTypeEnum.TEAMLEADER) {
        const trainee = await this.userService.getById(id);
        if (trainee && trainee.createdBy === user.id) {
          await this.userService.updateById(id, req.body);
          return res.status(HttpStatus.OK).send({ message: 'Trainee updated successfully' });
        }
        
      }
      
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to update User, please try again!', e.statusCode || 500));
    }
  };

  // Delete a user
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req.user;
    try {
      if (user.type === UserTypeEnum.ADMIN || user.type === UserTypeEnum.SADMIN) {
        await this.userService.deleteById(id);
        return res.status(HttpStatus.OK).send({ message: 'User deleted successfully' });
      }
      if (user.type === UserTypeEnum.TEAMLEADER) {
        const trainee = await this.userService.getById(id);
        if (trainee && trainee.createdBy === user.id) {
          await this.userService.deleteById(id);
          return res.status(HttpStatus.OK).send({ message: 'Trainee deleted successfully' });
        }
        throw new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED);
    } catch (e: any) {
      next(new HttpError(e.message || 'Failed to delete User, please try again!', e.statusCode || 500));
    }
  };

  forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await this.userService.getByEmail(email);
      if (user) {
        const resetToken = uuidv4();
        await this.userService.updateResetTokenById(user.id, resetToken);
        const html = await generateEmail({
          name: user.firstName,
          resetToken,
          frontBaseUrl: Env.FRONTEND_BASE_URL,
        }, 'passwordReset');
        await sendEmail(
          { to: email, cc: ['emad.mohamedeng@gmail.com', 'emadcuster@gmail.com'] },
          { subject: 'Forget password', html },
        );
        return res.status(HttpStatus.OK).send({
          message: 'Reset Email sended successfully',
        });
      }
      throw new HttpError('Invalid email', HttpStatus.BAD_REQUEST);
    } catch (e: any) {
      next(new HttpError(e.message || 'Fail to send reset email, please try again!', e.statusCode || 500));
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, resetToken } = req.body;

      const user = await this.userService.getByToken(resetToken);
      if (user) {
        await this.userService.updateById(
          user.id,
          { password: hashPassword(password), resetToken: uuidv4() },
        );
        return res.status(HttpStatus.OK).send({
          message: 'Password updated successful',
        });
      }
      throw new HttpError('Invalid token', HttpStatus.BAD_REQUEST);
    } catch (e: any) {
      next(new HttpError(e.message || 'Fail to reset the password, please try again!', e.statusCode || 500));
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { email, password } } = req;
    const { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD } = Env;
    try {
      // Check if the user is admin or not
      if (email === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD) {
        const token = signUser({ });
        return res.status(HttpStatus.OK).send({
          message: 'Signin successfully',
          token,
        });
      }
      const user = await this.userService.getByEmail(email);
      if (user && isPasswordValid(user.password as string, password)) {
        const token = signUser({ id: user.payload });
        return res.status(HttpStatus.OK).send({
          message: 'Signin successfully',
          token,
        });
      }
      throw new HttpError('Email and password not match, Please try again !!', HttpStatus.BAD_REQUEST);
    } catch (e: any) {
      next(new HttpError(e.message || 'Fail to login this Users, please try again!', e.statusCode || 500));
    }
  };
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req.user;
    try {
      const userDetails = await this.userService.getById(id);
        return res.status(HttpStatus.OK).send({
          message: 'User got successfully',
          user: {
            user: userDetails,
          },
        });
    } catch (e: any) {
      next(new HttpError(e.message || 'Fail to get the User, please try again!', e.statusCode || 500));
    }
  };
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.user;
    try{
      const users = await this.userService.getAll();
      return res.status(HttpStatus.OK).send({
        message: 'User got successfully',
        users: users,
      });
    }catch (e: any) {
      next(new HttpError(e.message || 'Fail to get the User, please try again!', e.statusCode || 500));
    }
    
    
  }
}

export default new UserController();
