import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '3h',
      },
      verifyOptions: {
        complete: false,
      },
    }),
  ],
  providers: [UserService, UserRepository, Logger],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
