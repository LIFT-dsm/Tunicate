import { IsObject, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entities';

export class ChangePasswordRequestDto {
  @IsObject()
  user: User;

  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}
