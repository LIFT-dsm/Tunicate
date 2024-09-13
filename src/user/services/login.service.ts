import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { Login } from '../usecase/login.usecase';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Override } from 'src/utils/decorators/override.decorator';

@Injectable()
export class LoginService implements Login {
  constructor(
    private readonly redis: Redis,
    private readonly logger: Logger,
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  @Override()
  async login(req: LoginRequstDto): Promise<LoginResponseDto> {
    const { studentId, password } = req;

    const user = await this.findUser(studentId);
    await this.checkPassword(password, user.password);

    const { accessToken, refreshToken } = await this.makeToken(studentId);
    const { accessExpireIn, refreshExpireIn } = await this.calExpireTime();
    await this.saveTokens(studentId, accessToken, refreshToken);

    return { accessToken, refreshToken, accessExpireIn, refreshExpireIn };
  }

  // 유저 존재 확인
  async findUser(studentId: number) {
    const user = await this.userRepository.findOneUserByStudentId(studentId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다');

    return user;
  }

  // 비밀번호 유효성 검사
  async checkPassword(rawPassword: string, encryptedPassword: string) {
    const isMatches = await bcrypt.compare(rawPassword, encryptedPassword);
    if (!isMatches) throw new ForbiddenException('비밀번호가 맞지 않습니다');
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
