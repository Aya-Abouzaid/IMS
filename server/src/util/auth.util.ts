import jwt from 'jsonwebtoken';
import Env from '../../config';
import { HttpError } from '../middleware/error.middleware';
import { HttpStatus } from '../types';

const { SECRETE, EXPIRE } = Env;

const signUser = (user: any) => {
  // const token = jwt.sign({ user }, SECRETE, { algorithm: 'HS256', expiresIn: EXPIRE });
  const token = jwt.sign({ user }, SECRETE, { algorithm: 'HS256' });
  return token;
};

const verifyToken = (authToken: string) => {
  try {
    const decoded = jwt.verify(authToken, SECRETE);
    return decoded;
  } catch (error) {
    throw new HttpError('Invalid token', HttpStatus.UNAUTHORIZED);
  }
};

export {
  signUser,
  verifyToken,
};
