import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expenses.repository';
import { CreateExpenseDto } from './dto';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpenseRepository) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expensesRepository.create(createExpenseDto);
  }
}
