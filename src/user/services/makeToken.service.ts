import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { Override } from 'src/utils/decorators/override.decorator';

@Injectable()
export class MakeTokenService {
  constructor(
    private readonly redis: Redis,
    private readonly logger: Logger,
    private readonly jwt: JwtService,
  ) {}

  async getTokenData(studentId: number) {
    const { accessToken, refreshToken } = await this.makeToken(studentId);
    const { accessExpireIn, refreshExpireIn } = await this.calExpireTime();
    await this.saveTokens(studentId, accessToken, refreshToken);

    return { accessToken, refreshToken, accessExpireIn, refreshExpireIn };
  }

  // jwt token 생성 함수
  async makeToken(studentId: number) {
    const payload = { studentId };

    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(
      { studentId: payload.studentId },
      { secret: process.env.REFRESH_SECRET, expiresIn: process.env.REFRESH_EXPIRE_TIME },
    );

    return { accessToken, refreshToken };
  }

  // token redis에 저장
  async saveTokens(studentId: number, accessToken: string, refreshToken: string) {
    await this.redis.setex(`${studentId}_access`, process.env.ACCESS_EXPIRE_TIME, accessToken);
    await this.redis.setex(`${studentId}_refresh`, process.env.REFRESH_EXPIRE_TIME, refreshToken);
  }

  // 만료시간 계산
  async calExpireTime() {
    const now = new Date().getTime();
    const accessExpireIn = await this.dateFormat(new Date(now + Number(process.env.ACCESS_EXPIRE_TIME)));
    const refreshExpireIn = await this.dateFormat(new Date(now + Number(process.env.REFRESH_EXPIRE_TIME)));

    return { accessExpireIn, refreshExpireIn };
  }

  async dateFormat(date: Date) {
    return (
      date.getFullYear() +
      '/' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '/' +
      String(date.getDate()).padStart(2, '0') +
      ' ' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0')
    );
  }
}
