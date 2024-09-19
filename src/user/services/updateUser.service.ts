import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserRequestDto } from '../dto/request/updateUser.request.dto';
import { Gender } from '../entities/user.entities';
import { UserRepository } from '../repository/user.repository';
import { UpdateUser } from '../usecase/updateUser.usecase';

@Injectable()
export class UpdateUserService implements UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(req: UpdateUserRequestDto): Promise<void> {
    const { user, ...updateData } = req;

    if (updateData.gender && updateData.gender != Gender.MALE && updateData.gender != Gender.FEMALE) {
      throw new BadRequestException('존재하지 않는 성별로 변경을 시도했습니다.');
    }

    await this.userRepository.updateUser(user.studentId, updateData);
  }
}
