import { DataNotFoundException } from '../exceptions/datanotfound.exception';
import UserModel, { IUser } from './user.model';

/**
 * User data access functions
 */
export class UserDao {
  /**
   * Create new User
   * @return a promise with created user
   */
  public createUser(user: IUser): Promise<IUser> {
    return UserModel.create(user);
  }

  /**
   * Find all users
   * @exception DataNotFoundException if no data in "users" collection
   * @return a promise with all users
   */
  public findAllUsers() {
    return UserModel.find().exec();
  }

  public findById(id: string) {
    return UserModel.findById(id).exec();
  }

  public findByEmail(email: string): Promise<IUser> {
    return UserModel.findOne({ email: email }).exec();
  }
}
