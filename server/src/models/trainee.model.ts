// src/models/Trainee.ts
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { TeamLeader } from './TeamLeader.model';
//import { Program } from './Program';
import { UserTypeEnum } from '../types';


export class Trainee extends User {
  @prop({ required: true, enum: UserTypeEnum, default: UserTypeEnum.TRAINEE })
  type!: string;

 // @prop({ ref: () => Program })
  //  programId!: Ref<Program>;

  @prop({ ref: () => TeamLeader })
    teamLeaderId!: Ref<TeamLeader>;
}

const TraineeModel = getModelForClass(Trainee);
export default TraineeModel;
