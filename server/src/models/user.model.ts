/* eslint-disable no-use-before-define */
import {
  prop, getModelForClass, Ref, pre,
} from '@typegoose/typegoose';
import { UserTypeEnum, StatusEnum, HttpStatus } from '../types';
import { HttpError } from '../middleware/error.middleware';

@pre<User>('save', async function preFun(this: any, next: () => void) {
  const existingUser = await UserModel.findOne({
    $or: [{ email: this.email }, { mobile: this.mobile }],
  });

  if (existingUser) {
    const duplicatedFields = [];

    if (existingUser.email === this.email) {
      duplicatedFields.push('email');
    }

    if (existingUser.mobile === this.mobile) {
      duplicatedFields.push('mobile');
    }

    throw new HttpError(`The User already exist with the same ${duplicatedFields.join(' and ')}.`, HttpStatus.CONFLICT);
  }

  next();
})

export class User {
  @prop({ required: true, maxlength: 20, minlength: 2 })
    firstName!: string;

  @prop({ required: false, maxlength: 20, minlength: 2 })
    lastName!: string;

  @prop({ required: true, unique: true })
    email!: string;

  @prop({ required: false, unique: true })
    mobile!: string;

  @prop({ required: true })
    password!: string;

  @prop({ required: false, default: 'default' })
    passwordStatus!: string;

  @prop({ required: false })
    resetToken!: string;

  @prop({ required: true, enum: UserTypeEnum })
    type!: string;

  @prop({ required: false })
    picture!: string;

  @prop({ required: true })
    payload!: string;

  @prop({ required: false, default: StatusEnum.ACTIVE, enum: StatusEnum })
    status!: string;

  // @prop({ ref: User, required: false })
  //   createdBy!: Ref<User>;

  //  fields for  roles
  //@prop({ ref: () => Program, required: false })
 // programId?: Ref<Program>;

  @prop({ ref: () => User, required: false })
  teamLeaderId?: Ref<User>;

  @prop({ ref: () => User, required: false })
  adminId?: Ref<User>;

  @prop({ required: false })
  department?: string;

  @prop({ required: false, enum: ['READ', 'WRITE', 'DELETE'] })
  permissions?: string;
  @prop({ required: true, default: Date.now() })
    createdAt!: Date;

  @prop({ required: true, default: Date.now() })
    updatedAt!: Date;
}

const UserModel = getModelForClass(User);
export default UserModel;
