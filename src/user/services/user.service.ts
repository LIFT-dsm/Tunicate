import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAccRequestDto } from '../dto/createAcc.request.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Gender } from '../entities/user.entities';
import { CreateUser } from '../usecase/createUser.usecase';
import { Override } from 'src/utils/decorators/override.decorator';

interface UserData {
  studentId: number;
  name: string;
  nickname: string;
  gender: Gender;
}

@Injectable()
export class UserService implements CreateUser {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  @Override()
  async createAccount(reqDto: CreateAccRequestDto): Promise<void> {
    const { password, ...userData } = reqDto;

    this.checkEnumValue(userData.gender);
    await this.checkUserExists(userData.studentId);

    await this.saveUser(password, userData);
  }

  // Enum에 존재하는 성별인지 체크
  private checkEnumValue(gender: string) {
    if (!(gender == 'MALE' || gender == 'FEMALE')) {
      throw new BadRequestException('존재하지 않는 성별입니다.');
    }
  }

  // 해당 studentId를 가진 유저가 이미 존재하는지 확인
  private async checkUserExists(studentId: number) {
    const thisUser = await this.userRepository.findOneUserByStudentId(studentId);

    if (thisUser) {
      throw new ConflictException('이미 해당 학번으로 등록된 유저가 있습니다.');
    }
  }

  // 유저 저장
  private async saveUser(password: string, userData: UserData) {
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
}
