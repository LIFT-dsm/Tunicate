import { DeleteUserRequestDto } from '../dto/request/deleteUser.request.dto';

export interface DeleteUser {
  deleteUser: (req: DeleteUserRequestDto) => Promise<void>;
}
