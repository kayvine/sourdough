import { IUser } from './user.model';
import { UserDao } from './user.dao';
import { EmailAlreadyExistsException } from '../exceptions/emailalreadyexists.exception';

export class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  public async createUser(user: IUser): Promise<IUser> {
    try {
      const isRegistered = await this.userDao.findByEmail(user.email);
      if (isRegistered) {
        // User exists
        throw new Error('Email is already registered.');
      } else {
        // Save user
        return this.userDao.createUser(user);
      }
    } catch (error) {
      throw new EmailAlreadyExistsException(error.message);
    }
  }

  public findAllUsers(): Promise<IUser[]> {
    return this.userDao.findAllUsers();
  }

  public findById(id: string): Promise<IUser> {
    return this.userDao.findById(id);
  }
}
