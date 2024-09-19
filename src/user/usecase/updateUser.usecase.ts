import { UpdateUserRequestDto } from '../dto/request/updateUser.request.dto';

export interface UpdateUser {
  updateUser: (req: UpdateUserRequestDto) => Promise<void>;
}
