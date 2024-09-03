import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private userEntity: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token: string = req.headers['Authorization'];

    if (!token) throw new BadRequestException('토큰이 필요합니다');
    if (!token.startsWith(process.env.JWT_PREFIX)) throw new BadRequestException('토큰형식 오류');

    const { id } = await this.jwt.decode(token.split(' ')[1]);
    const user = await this.userEntity.findOne({ where: { id } });

    return null;
  }
}
