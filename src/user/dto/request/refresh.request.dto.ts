import { IsObject } from 'class-validator';
import { User } from 'src/user/entities/user.entities';

export class RefreshRequestDto {
  @IsObject()
  user: User;
}
