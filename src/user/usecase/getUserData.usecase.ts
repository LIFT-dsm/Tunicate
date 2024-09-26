import { GetUserDataResponseDto } from '../dto/response/getUserData.response.dto';

export interface GetUserData {
  getUserData: (studentId: number) => Promise<GetUserDataResponseDto>;
}
