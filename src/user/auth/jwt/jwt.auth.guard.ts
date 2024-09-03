import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token: string = req.headers['Authorization'];

    if (!token) throw new BadRequestException('토큰이 필요합니다');
    if (!token.startsWith(process.env.JWT_PREFIX)) throw new BadRequestException('토큰형식 오류');

    const { id } = await this.jwt.decode(token.split(' ')[1]);

    const user = await this.userRepository.findOneUserByStudentId(id);
    if (!user) throw new NotFoundException('존재하지 않는 유저');

    req.body.user = user;

    return true;
  }
}
