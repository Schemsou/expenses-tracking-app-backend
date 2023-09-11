import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ExpenseCategory } from '../dto';

export class Expense {
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
