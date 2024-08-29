import { Module } from "@nestjs/common";
import { Party } from "./entities/party.entities";
import { PartyService } from "./party.service";
import { PartyController } from "./party.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartyRepositoryInterface } from "./repositories/party.repository.interface";
import { PartyRepository } from "./repositories/party.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Party])],
    providers: [
        PartyService,
        {
            provide: PartyRepositoryInterface,
            useClass: PartyRepository
        }
    ],
    controllers: [PartyController],
})
export class PartyModule {}
