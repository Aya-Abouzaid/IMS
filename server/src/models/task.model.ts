
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { StatusEnum } from '../types';


export class Task {
  @prop({ required: true, maxlength: 100, minlength: 2 })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: false })
  dueDate!: Date;

  @prop({ ref: () => User, required: true })
  assignedTo!: Ref<User>;

  @prop({ ref: () => User, required: false })
  createdBy!: Ref<User>;

  @prop({ ref: () => User, required: false })
  updatedBy!: Ref<User>;

  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  @prop({ required: false, enum: StatusEnum})
  status!: string;
}

const TaskModel = getModelForClass(Task);
export default TaskModel;
