import { Body, Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginService } from '../services/login.service';
import { DeleteUserRequestDto } from '../dto/request/deleteUser.request.dto';
import { DeleteUserService } from '../services/deleteUser.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly deleteuserService: DeleteUserService,
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

  @Delete('/')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() reqDto: DeleteUserRequestDto) {
    await this.deleteuserService.deleteUser(reqDto);
  }
}
