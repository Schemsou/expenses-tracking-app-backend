import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseCategory } from '../dto';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop()
  @IsString()
  title: string;

  @Prop()
  @IsNumber()
  amount: number;

  @Prop({ default: new Date() })
  @IsDate()
  @IsOptional()
  date?: Date;

  @Prop()
  @IsString()
  @IsEnum(ExpenseCategory)
  category: string;

  @Prop()
  @IsOptional()
  @IsString()
  description?: string;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
