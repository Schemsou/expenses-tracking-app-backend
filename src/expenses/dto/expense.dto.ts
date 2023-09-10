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
  @ValidateIf((dto) => dto.category === 'Other')
  description?: string;
}
