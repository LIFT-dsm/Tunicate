import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';
import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { RefreshService } from '../services/refresh.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { TokenType } from 'src/utils/decorators/tokenType.decorator';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly refreshService: RefreshService,
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

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  @TokenType('refresh')
  async refresh(@Body() reqDto: RefreshRequestDto) {
    const data = await this.refreshService.refreshCheck(reqDto);

    return { data };
  }
}
