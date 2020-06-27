import { User, IUser } from './user.model';
import { EmailAlreadyExistsException } from '../exceptions/emailalreadyexists.exception';

export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const isRegistered = await User.schema.statics.findByEmail(user.email);
    if (isRegistered) {
      // User exists
      throw new Error('Email is already registered.');
    } else {
      // Save user
      return User.create(user);
    }
  } catch (error) {
    throw new EmailAlreadyExistsException(error.message);
  }
};

export function findAllUsers(): Promise<IUser[]> {
  return User.find().exec();
}

export function findById(id: string): Promise<IUser | null> {
  return User.findById(id).exec();
}
