import { Logger, Module } from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { UserAuthController } from './controllers/user.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { LoginService } from './services/login.service';
import { Redis } from 'ioredis';
import { ChangePasswordService } from './services/changePassword.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.ACCESS_JWT_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_EXPIRE_TIME,
      },
      verifyOptions: {
        complete: false,
      },
    }),
  ],
  providers: [CreateUserService, LoginService, ChangePasswordService, UserRepository, Redis, Logger],
  controllers: [UserAuthController],
  exports: [CreateUserService, UserRepository],
})
export class UserModule {}
