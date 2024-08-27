import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  validateOrReject,
} from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../error.middleware';
import { HttpStatus } from '../../types';

export default class Keyword {
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @IsNotEmpty()
    keyword!: string;
}

export const isValidKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newKeyword = new Keyword();
    newKeyword.keyword = req.query.keyword as string;

    await validateOrReject(newKeyword);
    next();
  } catch {
    next(new HttpError('Invalid Search Query', HttpStatus.BAD_REQUEST));
  }
};
