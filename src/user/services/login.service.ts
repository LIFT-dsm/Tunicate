import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { Login } from '../usecase/login.usecase';
import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Override } from 'src/utils/decorators/override.decorator';
import { MakeTokenService } from './makeToken.service';

@Injectable()
export class LoginService implements Login {
  constructor(
    private readonly makeTokenService: MakeTokenService,
    private readonly userRepository: UserRepository,
  ) {}

  @Override()
  async login(req: LoginRequstDto): Promise<LoginResponseDto> {
    const { studentId, password } = req;

    const user = await this.findUser(studentId);
    await this.checkPassword(password, user.password);

    return this.makeTokenService.getTokenData(studentId);
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
}
