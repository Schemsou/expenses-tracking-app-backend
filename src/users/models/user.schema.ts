import * as mongoose from 'mongoose';
import { UserInterface } from './UserInterface';
export const UserSchema = new mongoose.Schema<UserInterface>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: Number },
});
