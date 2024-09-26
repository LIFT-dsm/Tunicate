import { ForbiddenException, Injectable } from '@nestjs/common';
import { ChangePasswordRequestDto } from '../dto/request/changePassword.reqeust.dto';
import { ChangePassword } from '../usecase/changePassword.usecase';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { Override } from 'src/utils/decorators/override.decorator';

@Injectable()
export class ChangePasswordService implements ChangePassword {
  constructor(private readonly userRepository: UserRepository) {}

  @Override()
  async changePassword(req: ChangePasswordRequestDto): Promise<void> {
    const { password, newPassword, user } = req;

    const isMatches = await bcrypt.compare(password, user.password);
    if (!isMatches) throw new ForbiddenException('비밀번호가 맞지 않습니다');

    const encrypedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = { ...user, password: encrypedPassword };

    await this.userRepository.updateUserPassword(newUser);
  }
}
