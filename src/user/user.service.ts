import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAccRequestDto } from './dto/createAcc.request.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async createAccount(reqDto: CreateAccRequestDto) {
    const { password, ...userData } = reqDto;

.
    const thisUser = await this.userRepository.findOneUserByStudentId(userData.studentId);

    if (thisUser) {
      throw new ConflictException('이미 해당 학번으로 등록된 유저가 있습니다.');
    }

    ,
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.userRepository.saveUser({
        ...userData,
        password: hashedPassword,
      });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  private  {
    if (!(userData.gender == 'MALE' || userData.gender == 'FEMALE')) {
      throw new BadRequestException('존재하지 않는 성별입니다.');
    }
  }
}
