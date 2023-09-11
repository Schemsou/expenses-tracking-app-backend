import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expenses.repository';
import { Expense } from './schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpenseDto } from './dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpenseRepository,
    @InjectModel(Expense.name)
    private expenseModel: Model<Expense>,
  ) {}

  async createExpense(createExpenseDto: any, user: User): Promise<Expense> {
    const data = Object.assign(createExpenseDto, { user: user._id });
    const expense = this.expensesRepository.create(data);
    return expense;
  }

  async findAll(): Promise<Expense[]> {
    return this.expensesRepository.findAll({});
  }

  async getExpenseById(expenseId: string): Promise<Expense> {
    try {
      const expense = await this.expensesRepository.findOne({ _id: expenseId });
      return expense;
    } catch {}
  }

  async deleteExpense(expenseId: string): Promise<Expense> {
    try {
      const expense = await this.expensesRepository.delete({ _id: expenseId });
      return expense;
    } catch {}
  }

  async getExpensesByUserId(userId: string): Promise<Expense[]> {
    return this.expensesRepository.findAll({ user: userId });
  }

  async getSumExpensesByUserId(userId: string): Promise<number> {
    const expenses = await this.expensesRepository.findAll({ user: userId });
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  async getTotalExpensesPerMonth(
    userId: string,
    year: number,
    month: number,
  ): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const expenses = await this.expensesRepository.findAll({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    return totalAmount;
  }
}
