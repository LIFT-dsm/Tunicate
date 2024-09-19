import { IsNumber, IsString } from 'class-validator';

export class GetUserDataResponseDto {
  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  gender: string;

  @IsNumber()
  studentId: number;

  @IsString()
  profile: string;
}
