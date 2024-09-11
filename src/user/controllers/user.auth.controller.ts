import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';
import { UpdateUserRequestDto } from '../dto/request/updateUser.request.dto';
import { UpdateUserService } from '../services/updateUser.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly updateUserService: UpdateUserService,
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

  @Patch('/info')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() reqDto: UpdateUserRequestDto) {
    await this.updateUserService.updateUser(reqDto);
  }
}
