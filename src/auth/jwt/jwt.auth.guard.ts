import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
    private readonly redis: Redis,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    const tokenType = this.reflector.get<string>('tokenType', context.getHandler());

    this.checkToken(token);

    const { id } = await this.extractId(token);
    const user = await this.findUser(id);

    req.body.user = user;
    await this.existInRedis(user.studentId, token, tokenType);

    return true;
  }

  private extractToken(req: Request) {
    return req.headers['authorization'];
  }

  private async extractId(token: string) {
    return await this.jwt.decode(token.split(' ')[1]);
  }

  // token 유효성 검사
  private checkToken(token: string) {
    if (!token) throw new BadRequestException('토큰이 필요합니다');
    if (!token.startsWith(process.env.JWT_PREFIX)) throw new BadRequestException('토큰형식 오류');
  }

  // 유저 검색
  private async findUser(id: number) {
    const user = await this.userRepository.findOneUserByStudentId(id);
    if (!user) throw new NotFoundException('존재하지 않는 유저');

    return user;
  }

  private async existInRedis(studentId: number, token: string, tokenType: string) {
    const redisToken = await this.redis.get(`${studentId}_${tokenType}`);

    if (redisToken != token.split(' ')[1]) throw new ForbiddenException('만료되거나 유효하지 않은 토큰입니다');
  }
}
