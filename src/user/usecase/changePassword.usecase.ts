import { ChangePasswordRequestDto } from '../dto/request/changePassword.reqeust.dto';

export interface ChangePassword {
  changePassword: (req: ChangePasswordRequestDto) => Promise<void>;
}
