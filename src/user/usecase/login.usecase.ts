import { LoginRequstDto } from '../dto/request/login.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';

export interface Login {
  login: (req: LoginRequstDto) => Promise<LoginResponseDto>;
}
