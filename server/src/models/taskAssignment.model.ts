
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Task } from './task.model';
import { Program } from './program.model';

export class TaskAssignment {
  @prop({ ref: () => Task, required: true })
  task!: Ref<Task>; 

  @prop({ ref: () => User, required: true })
  assignedTo!: Ref<User>; 

  @prop({ ref: () => User, required: true })
  assignedBy!: Ref<User>; 

  @prop({ ref: () => Program, required: true })
  program!: Ref<Program>; 

  @prop({ required: true, default: Date.now })
  assignedAt!: Date; 

  @prop({ required: true, default: Date.now })
  updatedAt!: Date;  

  @prop({ required: false })
  completedAt!: Date;  

  @prop({ required: false, default: false })
  isCompleted!: boolean;  
}

const TaskAssignmentModel = getModelForClass(TaskAssignment);
export default TaskAssignmentModel;
