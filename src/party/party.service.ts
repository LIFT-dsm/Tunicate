import { Injectable } from "@nestjs/common";
import { PartyRepositoryInterface } from "./repositories/party.repository.interface";
import { CreatePartyDto } from "./dto/create-party.dto";
import { Party } from "./entities/party.entities";

@Injectable()
export class PartyService {
    constructor(
        private readonly repository: PartyRepositoryInterface
    ) {}

    async create(dto: CreatePartyDto) {
        const party = {
            name: dto.partyName,
            destination: dto.destination,
            startDate: dto.startDate,
            endDate: dto.endDate
        }
        
        await this.repository.save(party)
    }
}