import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'email already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
