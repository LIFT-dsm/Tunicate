import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyModule } from './party/party.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [__dirname + './**/entities/*.ts'],
      timezone: 'Asia/Seoul',
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
    UserModule,
    PartyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
