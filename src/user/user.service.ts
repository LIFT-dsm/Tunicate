import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { CreateAccRequestDto } from './dto/createAcc.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async createAcc(reqDto: CreateAccRequestDto) {
    const { password, ...userdata } = reqDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!(userdata.gender == 'MALE' || userdata.gender == 'FEMALE')) {
      throw new BadRequestException('존재하지 않는 성별입니다.');
    }

    const thisUser = await this.userEntity.findOne({
      where: { studentId: userdata.studentId },
    });

    if (thisUser) {
      throw new ConflictException('이미 해당 학번으로 등록된 유저가 있습니다.');
    }

    try {
      await this.userEntity.save({
        ...userdata,
        password: hashedPassword,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
