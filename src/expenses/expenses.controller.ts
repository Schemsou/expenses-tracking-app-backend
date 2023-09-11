import { Body, Controller, Get, Post } from '@nestjs/common';
import { Expense } from './schemas/expense.schema';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}
  @Post('add')
  async addExpense(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    const createdExpense = await this.expenseService.createExpense(
      createExpenseDto.title,
      createExpenseDto.amount,
      createExpenseDto.date,
      createExpenseDto.category,
      createExpenseDto.description,
    );
    return createdExpense;
  }

  @Get('all')
  async getExpenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }
}
