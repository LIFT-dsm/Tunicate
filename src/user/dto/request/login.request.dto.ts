import { IsNumber, IsString } from 'class-validator';

export class LoginRequstDto {
  @IsNumber()
  studentId: number;

  @IsString()
  password: string;
}
