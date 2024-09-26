import { Controller, Get, Query } from '@nestjs/common';
import { GetUserDataService } from '../services/getUserData.service';

@Controller('/user')
export class UserDataContoller {
  constructor(private readonly getUserDataService: GetUserDataService) {}

  @Get('/info/:userId')
  async getUserData(@Query('userId') studentId: number) {
    const data = await this.getUserDataService.getUserData(studentId);

    return { data };
  }
}
