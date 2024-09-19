import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserData } from '../usecase/getUserData.usecase';
import { GetUserDataResponseDto } from '../dto/response/getUserData.response.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class GetUserDataService implements GetUserData {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(studentId: number): Promise<GetUserDataResponseDto> {
    const user = await this.userRepository.findOneUserByStudentId(studentId);
    if (!user) throw new NotFoundException('존재하지 않는 유저의 정보를 조회하려 시도했습니다');

    const data = {
      studentId: user.studentId,
      name: user.name,
      nickname: user.nickname,
      gender: user.gender,
      profile: user.profile,
    };

    return data;
  }
}
