import { Override } from "src/utils/decorators/override.decorator";
import { PartyRepository } from "../repositories/party.repository";
import { PartyUpdateDto } from "../dto/party-update.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PartyUpdateService {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async update(id: number, dto: PartyUpdateDto) {
        const party = await this.repository.findById(id);
        Object.assign(party, dto);

        await this.repository.update(party);
    }

}