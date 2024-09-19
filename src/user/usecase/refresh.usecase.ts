import { RefreshRequestDto } from '../dto/request/refresh.request.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';

export interface Refresh {
  refreshCheck: (req: RefreshRequestDto) => Promise<LoginResponseDto>;
}
