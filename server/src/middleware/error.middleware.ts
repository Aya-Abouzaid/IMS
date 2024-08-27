import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = async (err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Whoops!! Something went wrong';
  res.status(status).json({ status, message });
};

export class HttpError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export default errorMiddleware;
