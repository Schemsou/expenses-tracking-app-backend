import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/schemas/UserInterface';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password, phone } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      phone,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
