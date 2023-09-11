import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expenses.repository';
import { Expense } from './schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from './dto';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpenseRepository,
    @InjectModel(Expense.name)
    private expenseModel: Model<Expense>,
  ) {}

  async createExpense(createExpenseDto: any): Promise<Expense> {
    const expense = this.expensesRepository.create(createExpenseDto);
    return expense;
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

  async deleteExpense(expenseId: string): Promise<Expense> {
    try {
      const expense = await this.expensesRepository.delete({ _id: expenseId });
      return expense;
    } catch (error) {}
  }
}
