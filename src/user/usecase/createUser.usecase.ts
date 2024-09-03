import { CreateAccRequestDto } from '../dto/createAcc.request.dto';

export interface CreateUser {
  createAccount: (reqDto: CreateAccRequestDto) => Promise<void>;
}
