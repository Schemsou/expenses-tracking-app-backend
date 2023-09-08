export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: number;
}
