
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Task } from './task.model';

export class Program {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  description!: string; 

  @prop({ required: true })
  startDate!: Date; 

  @prop({ required: true })
  endDate!: Date; 

  @prop({ ref: () => Task, default: [] })
  tasks!: Ref<Task>[];  

  @prop({ required: true })
  createdBy!: string;  

  @prop({ required: true, default: Date.now })
  createdAt!: Date; 

  @prop({ required: true, default: Date.now })
  updatedAt!: Date;  

  @prop({ required: true, default: true })
  isActive!: boolean;  
}

const ProgramModel = getModelForClass(Program);
export default ProgramModel;
