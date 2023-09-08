import * as mongoose from 'mongoose';
import { IUser } from './UserInterface';

export const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: Number },
});
