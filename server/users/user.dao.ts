import { DataNotFoundException } from '../exceptions/datanotfound.exception';
import User, { IUser } from './user.model';

/**
 * User data access functions => replace with statics of mongoose
 */
export class UserDao {
  /**
   * Create new User
   * @return a promise with created user
   */
  public createUser(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  /**
   * Find all users
   * @exception DataNotFoundException if no data in "users" collection
   * @return a promise with all users
   */
  public findAllUsers() {
    return User.find().exec();
  }

  public findById(id: string) {
    return User.findById(id).exec();
  }

  public findByEmail(email: string): Promise<IUser> {
    return User.findOne({ email: email }).exec();
  }
}
