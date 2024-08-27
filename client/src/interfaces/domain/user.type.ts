/* eslint-disable no-unused-vars */

import { IMetaData } from "./base.type";

// These classes are User DOTs

// eslint-disable-next-line no-shadow
enum UserTypeEnum {
    SADMIN = 'sAdmin',
    ADMIN = 'admin',
}

type IUserBase = {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    type: UserTypeEnum,
}

type IDefaultUserAttributes = {
    passwordStatus: string,
}

// Other: orgId, password

interface IUserRef extends IUserBase, IDefaultUserAttributes, IMetaData{
    createdBy: string,
}

interface IUserCreate extends IUserBase{
    orgId?: string,
    clientId?: string,
    password: string,
    picture: string,
}

interface IUserSignIn {
    email: string,
    password: string,
}

interface IUserUpdate extends IUserBase, IDefaultUserAttributes{
    updatedAt: Date,
}

interface IUserPasswordUpdate{
    password: string,
}

interface IUserForgetPassword{
    email: string,
}

interface IUserResetPassword{
    resetToken: string,
    password: string,
}

interface IUser extends IUserBase, IDefaultUserAttributes, IMetaData{
    picture: string,
    createdBy: IUserRef,
}

interface IUserDB extends IUserBase, IDefaultUserAttributes, IMetaData{
    password: string,
    createdBy: string,
}

export type {
  IUserCreate,
  IUserSignIn,
  IUserUpdate,
  IUserPasswordUpdate,
  IUserForgetPassword,
  IUserResetPassword,
  IUser,
  IUserRef,
  IUserDB,
};

export {
  UserTypeEnum,
};
