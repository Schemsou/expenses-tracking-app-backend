import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ExpenseCategory {
  Food = 'Food',
  Bills = 'Bills',
  Travel = 'Travel',
  Entertainment = 'Entertainment',
  Transportation = 'Transportation',
  Other = 'Other',
}

export class CreateExpenseDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @ApiProperty({ default: new Date() })
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsEnum(ExpenseCategory)
  category: string;

  @IsOptional()
  @IsString()
  @ValidateIf((dto) => dto.category === 'Other')
  description?: string;
}
