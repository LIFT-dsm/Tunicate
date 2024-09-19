import { Injectable } from '@nestjs/common';
import { Refresh } from '../usecase/refresh.usecase';
import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { Override } from 'src/utils/decorators/override.decorator';
import { MakeTokenService } from './makeToken.service';
import { LoginResponseDto } from '../dto/response/login.response.dto';

@Injectable()
export class RefreshService implements Refresh {
  constructor(private readonly makeTokenService: MakeTokenService) {}

  @Override()
  async refreshCheck(req: RefreshRequestDto): Promise<LoginResponseDto> {
    const studentId = req.user.studentId;

    return this.makeTokenService.getTokenData(studentId);
  }
}
