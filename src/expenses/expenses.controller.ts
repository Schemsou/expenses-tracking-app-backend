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

  //Add new expense
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
  //Get all expenses
  @Get('all')
  async getExpenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  //Getting one epxense by its id
  @UseGuards(AuthGuard())
  @Get(':expenseId')
  async getExpense(@Param('expenseId') expenseId: string): Promise<Expense> {
    return this.expenseService.getExpenseById(expenseId);
  }

  //Delete expense
  @UseGuards(AuthGuard())
  @Delete(':expenseId')
  async deleteExpense(@Param('expenseId') expenseId: string): Promise<Expense> {
    return this.expenseService.deleteExpense(expenseId);
  }

  //Getting the user expenses
  @UseGuards(AuthGuard())
  @Get('my-expenses/:userId')
  async getExpensesByUserId(
    @Param('userId') userId: string,
  ): Promise<Expense[]> {
    return this.expenseService.getExpensesByUserId(userId);
  }

  //Getting the total expenses
  @UseGuards(AuthGuard())
  @Get('sum/:userId')
  async getSumExpensesByUserId(
    @Param('userId') userId: string,
  ): Promise<number> {
    return this.expenseService.getSumExpensesByUserId(userId);
  }
}
