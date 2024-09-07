import { IsObject } from 'class-validator';
import { User } from 'src/user/entities/user.entities';

export class LogoutRequstDto {
  @IsObject()
  user: User;
}
