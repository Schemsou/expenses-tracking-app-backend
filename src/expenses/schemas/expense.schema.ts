import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaFactory } from '@nestjs/mongoose';
import { ExpenseCategory } from '../dto';

export class Expense {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ default: new Date() })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty()
  @IsString()
  @IsEnum(ExpenseCategory)
  category: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
