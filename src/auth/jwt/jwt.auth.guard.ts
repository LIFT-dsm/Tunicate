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
    const req = context.switchToHttp().getRequest()
    const token = this.extractToken(req)

    this.checkToken(token);

    const { id } = await this.extractId(token)
    req.body.user = await this.findUser(id)

    return true
  }

  private extractToken(req: Request) {
    return req.headers['Authorization']
  }

  private async extractId(token: string) {
    return await this.jwt.decode(token.split(' ')[1])
  }

  // token 유효성 검사
  private checkToken(token: string) {
    if (!token) throw new BadRequestException('토큰이 필요합니다');
    if (!token.startsWith(process.env.JWT_PREFIX)) throw new BadRequestException('토큰형식 오류')
  }

  // 유저 검색
  private async findUser(id: number) {
    const user = await this.userRepository.findOneUserByStudentId(id)
    if (!user) throw new NotFoundException('존재하지 않는 유저')

    return user
  }
}
