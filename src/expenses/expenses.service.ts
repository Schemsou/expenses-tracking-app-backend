import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expenses.repository';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpenseRepository) {}

  async createExpense(
    title: string,
    amount: number,
    date: Date,
    category: string,
    description: string,
  ): Promise<Expense> {
    const createdExpense = await this.expensesRepository.create({
      title,
      amount,
      date,
      category,
      description,
    });
    return createdExpense;
  }

  async findAll(): Promise<Expense[]> {
    return this.expensesRepository.findAll({});
  }

  async getExpenseById(expenseId: string): Promise<Expense> {
    try {
      const expense = await this.expensesRepository.findOne({ _id: expenseId });
      return expense;
    } catch (error) {
      throw new error();
    }
  }
}
