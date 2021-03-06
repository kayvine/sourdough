import { sign, SignOptions, Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User, IUser } from '../users/user.model';

function createToken(user: IUser): String {
  const payload = {
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    company: user.company,
    test: true,
    exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  };

  // options:

  // algorithm (default: HS256)
  // expiresIn: expressed in seconds or a string describing a time span zeit/ms.
  // notBefore: expressed in seconds or a string describing a time span zeit/ms.
  // audience
  // issuer
  // jwtid
  // subject
  // noTimestamp
  // header
  // keyid
  // mutatePayload: if true, the sign function will modify the payload object directly. This is useful if you need a raw reference to the payload after claims have been applied to it but before it has been encoded into a token.
  const options: SignOptions = {
    subject: user._id,
    audience: 'sourdough',
  };
  return sign(payload, process.env.SECRET as Secret);
  // return {
  //   bearer_token: token,
  //   exp: payload.exp,
  //   subject: options.subject,
  //   firstName: user.firstName,
  //   lastName: user.lastName
  // };
}

export const authenticate = async ({ email, password }: any): Promise<String> => {
  const user = await User.findByEmail(email);
  if (!user) {
    throw new Error('Login failed! User not found.');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Login failed! Password is incorrect.');
  }
  return createToken(user);
};
