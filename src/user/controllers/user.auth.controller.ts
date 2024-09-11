import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { ChangePasswordRequestDto } from '../dto/request/changePassword.reqeust.dto';
import { ChangePasswordService } from '../services/changePassword.service';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly changePasswordService: ChangePasswordService,
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

  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Body() reqDto: ChangePasswordRequestDto) {
    await this.changePasswordService.changePassword(reqDto);
  }
}
