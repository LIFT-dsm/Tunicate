import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(@InjectRepository(User) private readonly userEntity: Repository<User>) {}

  async findOneUserByStudentId(studentId: number): Promise<User> {
    return await this.userEntity.findOne({ where: { studentId } });
  }

  async saveUser(user: User): Promise<void> {
    await this.userEntity.save(user);
  }
}
