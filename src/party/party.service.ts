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
        const party: Party = new Party()

        Object.assign(party, {
            name: dto.party_name,
            destination: dto.destination,
            startate: dto.start_date,
            end_date: dto.end_date
        });
        
        await this.repository.save(party)
    }
}