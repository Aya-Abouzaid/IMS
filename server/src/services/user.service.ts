/* eslint-disable arrow-body-style */
import {
  IUserCreate, IUserPasswordUpdate, IStatusUpdate, IUserUpdate,
} from '../types';

/**
 * @summary This class contain the service that responsible for the business logs of User
 * */
class UserServices {
  private userData: any;

  // Constructor that sets the userData property to injected data access of User
  constructor(userData: any) {
    this.userData = userData;
  }

  create = async (user: IUserCreate) => {
    return this.userData.create(user);
  };

  updateById = async (id: string, user: IUserUpdate | IUserPasswordUpdate | IStatusUpdate) => {
    return this.userData.updateById(id, user);
  };

  updateResetTokenById = async (id: string, resetToken: string) => {
    await this.userData.updateResetTokenById(id, resetToken);
  };

  removeResetToken = async (id: string) => {
    await this.userData.removeResetToken(id);
  };

  getById = async (id: string) => {
    return this.userData.getById(id);
  };

  getLoggedById = async (id: string) => {
    return this.userData.getLoggedById(id);
  };

  getByPayload = async (payload: string) => {
    return this.userData.getByPayload(payload);
  };

  getByToken = async (token: string) => {
    return this.userData.getByToken(token);
  };

  getByEmail = async (id: string) => {
    return this.userData.getByEmail(id);
  };

  getAll = async () => {
    return this.userData.getAll();
  };

  deleteById = async (id: string) => {
    return this.userData.deleteById(id);
  };
}

export default UserServices;
