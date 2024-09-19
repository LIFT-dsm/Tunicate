import { Injectable } from "@nestjs/common";
import { PartyRepository } from "../repositories/party.repository";
import { PartyCancelUseCase } from "../usecase/party.cancel.usecase";
import { Override } from "src/utils/decorators/override.decorator";
import { todo } from "node:test";

@Injectable()
export class PartyCancelService implements PartyCancelUseCase {
    constructor(
        private readonly repository: PartyRepository
    ) {
    }

    @Override()
    async cancel(id: number) {
        // TODO: 사용자 검증 로직 필요
        await this.repository.deleteById(id);
    }
}