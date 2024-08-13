// src/models/TeamLeader.ts
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Admin } from './admin.model';
import { UserTypeEnum } from '../types'; 

export class TeamLeader extends User {
  @prop({ required: true, enum: UserTypeEnum, default: UserTypeEnum.TEAMLEADER })
    type!: string;

  @prop({ required: true })
    department!: string;

  @prop({ ref: () => Admin })
    adminId!: Ref<Admin>;

  /* @prop({ ref: () => Program, default: [] })
  managedPrograms!: Ref<Program>[]; */
}

const TeamLeaderModel = getModelForClass(TeamLeader);
export default TeamLeaderModel;
