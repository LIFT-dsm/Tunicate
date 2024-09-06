import { IsNumber, IsString } from 'class-validator';
import { Gender } from '../../entities/user.entities';

export class CreateAccRequestDto {
  @IsNumber()
  studentId: number;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;

  @IsString()
  gender: Gender;
}
