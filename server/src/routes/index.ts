import { Router } from 'express';
import userRouter from './api/user.route';

const routes = Router();
routes.use('/users', userRouter);

export default routes;
