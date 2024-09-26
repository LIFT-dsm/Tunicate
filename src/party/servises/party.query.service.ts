import { Override } from "src/utils/decorators/override.decorator";
import { PartyRepository } from "../repositories/party.repository";
import { PartySearchDto, PartySearchResponseDto } from "../dto/party-search.dto";
import { PartyDetailDto } from "../dto/party-detail.dto";
import { Injectable } from "@nestjs/common";
import { PartyQueryUseCase } from "../usecase/party.query.usecase";

@Injectable()
export class PartyQueryService implements PartyQueryUseCase {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async search(keyword: string): Promise<PartySearchResponseDto> {
        const result = await this.repository.search(keyword);

        return {
            data: result.map((party) => ({
                id: party.id,
                name: party.name,
                startDate: party.startDate,
                endDate: party.endDate,
                destination: party.destination,
                leader: party.leader
            }))
        };
    }

    @Override()
    async viewDetail(id: number): Promise<PartyDetailDto> {
        const result = await this.repository.findByIdWithMembers(id);

        return {
            id: result.id,
            name: result.name,
            startDate: result.startDate,
            endDate: result.endDate,
            destination: result.destination,
            leader: result.leader,
            members: result.members
        }
    }

}