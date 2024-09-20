import { ForbiddenException, Injectable } from "@nestjs/common";
import { PartyRepository } from "../repositories/party.repository";
import { PartyCancelUseCase } from "../usecase/party.cancel.usecase";
import { Override } from "src/utils/decorators/override.decorator";
import { todo } from "node:test";
import { PartyCancelDto } from "../dto/party-cancel.dto";

@Injectable()
export class PartyCancelService implements PartyCancelUseCase {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async cancel(id: number, dto: PartyCancelDto) {
        const currentUser = dto.user;
        const party = await this.repository.findById(id);

        if (currentUser.studentId !== party.leader.studentId) {
            throw new ForbiddenException('해당 파티를 삭제할 수 없습니다.');
        }

        await this.repository.delete(party);
    }
}