import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
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

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid Credentiels');

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      throw new UnauthorizedException('Invalid Credentiels');
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
