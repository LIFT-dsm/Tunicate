import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteUser } from '../usecase/deleteUser.usecase';
import { DeleteUserRequestDto } from '../dto/request/deleteUser.request.dto';
import { Override } from 'src/utils/decorators/override.decorator';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteUserService implements DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  @Override()
  async deleteUser(req: DeleteUserRequestDto) {
    const studentId = req.user.studentId;

    const user = await this.userRepository.findOneUserByStudentId(studentId);
    if (!user) throw new NotFoundException('존재하지 않는 유저');

    await this.userRepository.deleteUser(user);
  }
}
