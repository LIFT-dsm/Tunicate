import { IsObject, IsOptional, IsString } from 'class-validator';
import { Gender, User } from 'src/user/entities/user.entities';

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  gender?: Gender;

  @IsObject()
  user: User;
}
