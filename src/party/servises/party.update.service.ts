import { Override } from "src/utils/decorators/override.decorator";
import { PartyRepository } from "../repositories/party.repository";
import { PartyUpdateDto } from "../dto/party-update.dto";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PartyUpdateUseCase } from "../usecase/party.update.usecase";

@Injectable()
export class PartyUpdateService implements PartyUpdateUseCase {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async update(id: number, dto: PartyUpdateDto) {
        const currentUser = dto.user;
        const party = await this.repository.findById(id);

        if (currentUser.studentId !== party.leader.studentId) {
            throw new ForbiddenException('해당 파티를 수정할 수 없습니다.');
        }

        Object.assign(party, dto);

        await this.repository.update(party);
    }

}