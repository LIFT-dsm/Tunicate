import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccRequestDto } from './dto/createAcc.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createAcc(@Body() reqDto: CreateAccRequestDto) {
    await this.userService.createAccount(reqDto);
  }
}
