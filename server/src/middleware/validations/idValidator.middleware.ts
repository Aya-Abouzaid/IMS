import {
  IsMongoId,
  IsNotEmpty,
  validateOrReject,
} from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../error.middleware';
import { HttpStatus } from '../../types';

export default class Id {
  @IsMongoId({
    groups: ['id'],
  })
  @IsNotEmpty({
    groups: ['id'],
  })
    id!: string;
  @IsMongoId({
    groups: ['userId'],
  })
  @IsNotEmpty({
    groups: ['userId'],
  })
    userId!: string;

}

export const isValidId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Id();
    id.id = req.params.id;

    await validateOrReject(id, { groups: ['id'] });
    next();
  } catch (errors: any) {
    next(new HttpError(`Invalid ${(errors.map((e: any) => e.property))}`, HttpStatus.BAD_REQUEST));
  }
};

export const isValidUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = new Id();
    id.userId = req.params.userId;

    await validateOrReject(id, { groups: ['userId'] });
    next();
  } catch {
    next(new HttpError('Invalid User Id', HttpStatus.BAD_REQUEST));
  }
};
