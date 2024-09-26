import { Body, Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { UpdateUserRequestDto } from '../dto/request/updateUser.request.dto';
import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { CreateUserService } from '../services/createUser.service';
import { LoginService } from '../services/login.service';
import { DeleteUserRequestDto } from '../dto/request/deleteUser.request.dto';
import { DeleteUserService } from '../services/deleteUser.service';
import { ChangePasswordRequestDto } from '../dto/request/changePassword.reqeust.dto';
import { ChangePasswordService } from '../services/changePassword.service';
import { UpdateUserService } from '../services/updateUser.service';
import { RefreshService } from '../services/refresh.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { TokenType } from 'src/utils/decorators/tokenType.decorator';

@Controller('user')
export class UserAuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loginService: LoginService,
    private readonly deleteuserService: DeleteUserService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly updateUserService: UpdateUserService,
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

  @Delete('/')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() reqDto: DeleteUserRequestDto) {
    await this.deleteuserService.deleteUser(reqDto);
  }
  
  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Body() reqDto: ChangePasswordRequestDto) {
    await this.changePasswordService.changePassword(reqDto);
  }
  
  @Patch('/info')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() reqDto: UpdateUserRequestDto) {
    await this.updateUserService.updateUser(reqDto);
  }

  @Post('/refresh')
  @UseGuards(JwtAuthGuard)
  @TokenType('refresh')
  async refresh(@Body() reqDto: RefreshRequestDto) {
    const data = await this.refreshService.refreshCheck(reqDto);

    return { data };
  }
}
