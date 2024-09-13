import { CreateAccRequestDto } from '../dto/request/createAcc.request.dto';

export interface CreateUser {
  createAccount: (reqDto: CreateAccRequestDto) => Promise<void>;
}
