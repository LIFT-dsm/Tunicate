import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
  ) {}

  @Post('/signup')
  async createAcc(@Body() reqDto: CreateAccRequestDto) {
    await this.createUserService.createAccount(reqDto);
  }

  @Post('/login')
  async login(@Body() reqDto: LoginRequstDto) {
    const data = await this.loginService.login(reqDto);

    return { data };
  }
}
