import { Schema, Document, Model, model } from 'mongoose';
// import validator from 'validator';
import * as bcrypt from 'bcryptjs';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: (value) => {
    //   if (!validator.isEmail(value)) {
    //     throw new Error('Invalid Email address');
    //   }
    //   return validator.isEmail(value);
    // },
  },
  password: { type: String, required: true },
  company: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now, set: Date.now },
});

export interface IUserDocument extends IUser, Document {
  findOfSameCompany: (this: IUserDocument) => Promise<IUser[]>;
}

userSchema.pre('save', async function (this: IUserDocument, next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.findOfSameCompany = async function findOfSameCompany(this: IUserDocument): Promise<IUser[]> {
  return await User.find({ company: this.company }).lean();
};

export interface IUserModel extends Model<IUserDocument> {
  findByEmail: (this: IUserModel, email: string) => Promise<IUserDocument>;
}

userSchema.statics.findByEmail = function findByEmail(email: string): Promise<IUserDocument> {
  return this.find({ email: email });
};

// userSchema.statics.findByCredentials = async (email, password) => {
//   // Search for a user by email and password.
//   const user = await User.findOne({ email} )
//   if (!user) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password)
//   if (!isPasswordMatch) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   return user
// }

// Export the model and return your IUser interface
export const User = model<IUserDocument, IUserModel>('User', userSchema);
