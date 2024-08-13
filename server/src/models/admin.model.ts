import { prop, getModelForClass } from '@typegoose/typegoose';
import { User } from './user.model';
import { UserTypeEnum } from '../types';

export class Admin extends User {
  @prop({ required: true, enum: UserTypeEnum, default: UserTypeEnum.ADMIN })
  type!: string;
  
  @prop({ required: true, enum: ['READ', 'WRITE', 'DELETE'] })
  permissions!: string;

  
}

const AdminModel = getModelForClass(Admin);
export default AdminModel;
