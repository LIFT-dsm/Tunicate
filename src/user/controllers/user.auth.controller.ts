import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { LogoutRequstDto } from '../dto/request/logout.request.dto';
import { LogoutService } from '../services/logout.service';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
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

  @Post('/logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logout(@Body() reqDto: LogoutRequstDto) {
    await this.logoutService.logout(reqDto);
  }
}
