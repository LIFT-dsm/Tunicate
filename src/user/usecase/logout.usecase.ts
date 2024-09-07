import { LogoutRequstDto } from '../dto/request/logout.request.dto';

export interface LogoutUseCase {
  logout: (req: LogoutRequstDto) => Promise<void>;
}
