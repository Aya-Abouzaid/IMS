import { HttpError } from '../middleware/error.middleware';
import { UserModel } from '../models';
import {
  IUserCreate, IUserUpdate, IUserPasswordUpdate, IStatusUpdate, HttpStatus,
} from '../types';

/**
 * @summary This class contain the data access that responsible for database handling of User
 * */
class UseeData {
  // That is is DTO of user that will return to the client
  convertToUserOutDTO = (user: any) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
    email: user.email,
    type: user.type,
    picture: user.picture,
    passwordStatus: user.passwordStatus,
    status: user.status,
    createdBy: user.createdBy,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  /**
  Creates a new User object in the database
  @param user - The UserCreate object containing the new User's data
  @returns The new User object converted to a UserOutDTO object
  @throws An error if the creation fails
  */
  create = async (user: IUserCreate) => {
    const newUser = new UserModel(user);
    await newUser.save();
    return this.convertToUserOutDTO(newUser);
  };

  /**
  Updates an existing User object in the database by ID
  @param id - The ID of the User object to update
  @param user - The UserUpdate, UserPasswordUpdate, or StatusUpdate object containing the updates
  @returns The updated User object converted to a UserOutDTO object
  @throws An error if the update fails
  */
  updateById = async (id: string, user: IUserUpdate | IUserPasswordUpdate | IStatusUpdate) => {
    const isUserExist = await UserModel.findOne({ _id: id });
    if (isUserExist) {
      return UserModel.updateOne({ _id: id }, user);
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  updateResetTokenById = async (id: string, resetToken: string) => {
    const isUserExist = await UserModel.findOne({ _id: id });
    if (isUserExist) {
      return UserModel.updateOne({ _id: id }, { resetToken });
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  removeResetToken = async (id: string) => {
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      user.set({ resetToken: undefined });
      await user.save();
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  /**
  Retrieves a User object from the database by ID
  @param id - The ID of the User object to retrieve
  @returns The retrieved User object converted to a UserOutDTO object
  @throws An error if the retrieval fails or the User doesn't exist
  */
  getById = async (id: string) => {
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      return this.convertToUserOutDTO(user);
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };
  /**
  Retrieves a User object from the database by ID
  @param id - The ID of the User object to retrieve
  @returns The retrieved User object converted to a UserOutDTO object
  @throws An error if the retrieval fails or the User doesn't exist
  */
  getByPayload = async (payload: string) => {
    const isUserExist = await UserModel.findOne({ payload });
    if (isUserExist) {
      const user = await UserModel.findOne({ payload });
      return { ...this.convertToUserOutDTO(user), payload: user?.payload };
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  getLoggedById = async (id: string) => {
    const isUserExist = await UserModel.findOne({ _id: id });
    if (isUserExist) {
      const user = await UserModel.findOne({ _id: id });
      return { ...this.convertToUserOutDTO(user) };
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  /**
  Retrieves a User object from the database by Token
  @param id - The ID of the User object to retrieve
  @returns The retrieved User object converted to a UserOutDTO object
  @throws An error if the retrieval fails or the User doesn't exist
  */
  getByToken = async (token: string) => {
    const isUserExist = await UserModel.findOne({ resetToken: token });
    if (isUserExist) {
      const user = await UserModel.findOne({ resetToken: token });
      return this.convertToUserOutDTO(user);
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  /**
  Retrieves a User object from the database by email
  @param email - The email of the User object to retrieve
  @returns The retrieved User object converted to a UserOutDTO object with password included
  @throws An error if the retrieval fails or the email is not found
  */
  getByEmail = async (email: string) => {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      const user = await UserModel.findOne({ email });
      return {
        ...this.convertToUserOutDTO(user),
        password: user?.password,
        payload: user?.payload,
      };
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

  /**
  Retrieves all User objects from the database
  @returns An array of all User objects converted to UserOutDTO objects
  @throws An error if the retrieval fails
  */
  getAll = async () => (await UserModel.find()).map((user: any) => this.convertToUserOutDTO(user));


  /**
  Deletes a User object from the database by ID
  @param id - The ID of the User object to delete
  @returns The result of the deletion operation
  @throws An error if the deletion fails
  */
  deleteById = async (id: string) => {
    const isUserExist = await UserModel.findOne({ _id: id });
    if (isUserExist) {
      return UserModel.deleteOne({ _id: id });
    }
    throw new HttpError('There is no User with this info!, Please try again !!', HttpStatus.NOT_FOUND);
  };

}

export default UseeData;
