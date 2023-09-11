import { Body, Controller, Post } from '@nestjs/common';
import { Expense } from './schemas/expense.schema';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}
  @Post('add')
  addExpense(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.createExpense(createExpenseDto);
  }
}
