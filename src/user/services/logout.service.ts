import { Override } from 'src/utils/decorators/override.decorator';
import { LogoutUseCase } from '../usecase/logout.usecase';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LogoutRequstDto } from '../dto/request/logout.request.dto';

@Injectable()
export class LogoutService implements LogoutUseCase {
  constructor(
    private readonly redis: Redis,
    private readonly logger: Logger,
  ) {}

  @Override()
  async logout(req: LogoutRequstDto) {
    const { user } = req;

    try {
      await this.redis.del([`${user.studentId}_access`, `${user.studentId}_refresh`]);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
