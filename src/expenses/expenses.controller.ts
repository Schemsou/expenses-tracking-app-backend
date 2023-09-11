import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Expense } from './schemas/expense.schema';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @UseGuards(AuthGuard())
  @Post('add')
  async addExpense(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() req,
  ): Promise<Expense> {
    const createdExpense = await this.expenseService.createExpense(
      createExpenseDto,
      req.user,
    );
    return createdExpense;
  }

  @Get('all')
  async getExpenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':expenseId')
  async getExpense(@Param('expenseId') expenseId: string): Promise<Expense> {
    return this.expenseService.getExpenseById(expenseId);
  }

  @Delete(':expenseId')
  async deleteExpense(@Param('expenseId') expenseId: string): Promise<Expense> {
    return this.expenseService.deleteExpense(expenseId);
  }
}
