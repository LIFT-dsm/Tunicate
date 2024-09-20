import { Logger, Module } from "@nestjs/common";
import { Party } from "./entities/party.entities";
import { PartyController } from "./controllers/party.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyRepository } from "./repositories/party.repository";
import { PartyRepositoryImpl } from "./repositories/party.repository.impl";
import { PartyOpenUseCase } from "./usecase/party.open.usecase";
import { PartyOpenService } from "./servises/party.open.service";
import { PartyCancelUseCase } from "./usecase/party.cancel.usecase";
import { PartyCancelService } from "./servises/party.cancel.service";
import { PartyUpdateUseCase } from "./usecase/party.update.usecase";
import { PartyUpdateService } from "./servises/party.update.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.auth.guard";
import { Redis } from "ioredis";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entities";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Party, User]),
        UserModule,
    ],
    providers: [
        {
            provide: PartyOpenUseCase,
            useClass: PartyOpenService
        },
        {
            provide: PartyCancelUseCase,
            useClass: PartyCancelService
        },
        {
            provide: PartyUpdateUseCase,
            useClass: PartyUpdateService
        },
        {
            provide: PartyRepository,
            useClass: PartyRepositoryImpl
        },
        JwtAuthGuard,
        JwtService,
        Redis
    ],
    controllers: [PartyController],
})
export class PartyModule {}
