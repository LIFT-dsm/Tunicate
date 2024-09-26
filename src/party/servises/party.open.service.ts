import { Injectable } from "@nestjs/common";
import { PartyRepository } from "../repositories/party.repository";
import { PartyOpenDto } from "../dto/party-open.dto";
import { Override } from "src/utils/decorators/override.decorator";
import { PartyOpenUseCase } from "../usecase/party.open.usecase";

@Injectable()
export class PartyOpenService implements PartyOpenUseCase {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async open(dto: PartyOpenDto) {
        const party = {
            name: dto.partyName,
            destination: dto.destination,
            startDate: dto.startDate,
            endDate: dto.endDate,
            code: this.generateRandomPartyCode(),
            leader: dto.user 
        };

        await this.repository.save(party);
    }

    private generateRandomPartyCode(): string {
        return Math.random().toString().slice(2, 8);
    }
}