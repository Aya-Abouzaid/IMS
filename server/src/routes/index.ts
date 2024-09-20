import { Router } from 'express';
import userRouter from './api/user.route';
import programRouter from './api/program.route';  
import taskRouter from './api/task.route'; 
const routes = Router();
routes.use('/users', userRouter);
routes.use('/programs', programRouter);
routes.use('/tasks', taskRouter);  
export default routes;




