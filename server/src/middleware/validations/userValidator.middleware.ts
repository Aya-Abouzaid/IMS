import { NextFunction, Request, Response } from 'express';
import {
  validateOrReject,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsEnum,
  IsStrongPassword,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { UserTypeEnum } from '../../types/user.type';
// import { IsAllPhoneNumbers } from './phoneNumber.decorator';
import { HttpError } from '../error.middleware';
import { HttpStatus } from '../../types';

export default class User {
  @IsString({
    groups: ['create', 'update'],
  })
  @Matches(/^[a-zA-Z\s]+$/, { groups: ['create', 'update'] })
  @IsNotEmpty({
    groups: ['create'],
  })
    firstName!: string;

  @IsString({
    groups: ['create', 'update'],
  })
  @Matches(/^[a-zA-Z\s]+$/, { groups: ['create', 'update'] })
  @IsNotEmpty({
    groups: ['create'],
  })
    lastName!: string;

  @IsEmail({}, {
    groups: ['create', 'update', 'login'],
  })
  @IsNotEmpty({
    groups: ['create', 'login'],
  })
    email!: string;

  // @IsMobilePhone({
  //   groups: ['create', 'update'],
  // })
  @Matches(/^[0-9]+$/, { groups: ['create', 'update'] })
  @IsOptional({
    groups: ['create'],
  })
    mobile!: string;

  @IsStrongPassword({
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
  }, {
    groups: ['create', 'login', 'updatePassword'],
  })
  @IsNotEmpty({
    groups: ['create', 'login', 'updatePassword'],
  })
    password!: string;

  @IsEnum(UserTypeEnum, {
    groups: ['create', 'update'],
  })
  @IsNotEmpty({
    groups: ['create'],
  })
    type!: string;
}

const isUserValidForCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const newUser = new User();

    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.email = body.email;
    newUser.mobile = body.mobile;
    newUser.password = body.password;
    newUser.type = body.type;

    await validateOrReject(newUser, { groups: ['create'] });

    next();
  } catch (errors: any) {
    next(new HttpError(`Invalid: ${(errors?.map((e: any) => e.property))}`, HttpStatus.BAD_REQUEST));
  }
};

const isUserValidForLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const newUser = new User();
    newUser.email = body.email;
    newUser.password = body.password;
    await validateOrReject(newUser, { groups: ['login'] });
    next();
  } catch (errors: any) {
    next(new HttpError(`Invalid: ${(errors.map((e: any) => e.property))}`, HttpStatus.BAD_REQUEST));
  }
};

const isUserValidForPasswordUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const newUser = new User();
    newUser.password = body.password;
    await validateOrReject(newUser, { groups: ['passwordUpdate'] });
    next();
  } catch (errors: any) {
    next(new HttpError(`Invalid: ${(errors.map((e: any) => e.property))}`, HttpStatus.BAD_REQUEST));
  }
};

const isUserValidForUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const newUser = new User();

    newUser.email = body.email;
    newUser.type = body.type;
    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.mobile = body.mobile;

    await validateOrReject(newUser, { groups: ['update'] });
    next();
  } catch (errors: any) {
    next(new HttpError(`Invalid: ${(errors.map((e: any) => e.property))}`, HttpStatus.BAD_REQUEST));
  }
};

export {
  isUserValidForLogin,
  isUserValidForCreate,
  isUserValidForPasswordUpdate,
  isUserValidForUpdate,
};
