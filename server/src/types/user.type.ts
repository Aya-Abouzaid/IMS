/* eslint-disable no-unused-vars */

// These classes are User DTOs
// eslint-disable-next-line no-shadow
enum UserTypeEnum {
    ADMIN = 'admin',
    SADMIN = 'sAdmin',
    TEAMLEADER='TeamLeader',
    TRAINEE='Trainee'
}

enum UserLevelEnum {
    ADMIN = 'ADMIN',
}

type IUserBase = {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    type: UserTypeEnum,
}

type IDefaultUserAttributes = {
    // status: StatusEnum,
    passwordStatus: string,
}

// Other: orgId, password

interface IUserCreate extends IUserBase{
    password: string,
    picture?: string,
    payload: string,
}

interface IUserSignIn {
    email: string,
    password: string,
}

interface IUserUpdate extends IUserBase, IDefaultUserAttributes{
    updatedAt: Date,
}

interface IUserPasswordUpdate{
    // email: string,
    password: string,
    updatedAt: Date,
}

interface IUserForgetPassword{
    email: string,
}

interface IUserResetPassword{
    resetToken: string,
    password: string,
}

export type {
  IUserCreate,
  IUserSignIn,
  IUserUpdate,
  IUserPasswordUpdate,
  IUserForgetPassword,
  IUserResetPassword,
};

export {
  UserTypeEnum,
  UserLevelEnum,
};
