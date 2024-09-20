import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Party } from "../entities/party.entities"
import { PartyRepository } from "./party.repository";
import { Override } from "src/utils/decorators/override.decorator";

@Injectable()
export class PartyRepositoryImpl implements PartyRepository {
    constructor(
        @InjectRepository(Party)
        private readonly repository: Repository<Party>
    ) {}

    @Override()
    async save(entity: Party) {
        await this.repository.save(entity);
    }

    @Override()
    async findById(id: number): Promise<Party | null> {
        return await this.repository.findOne({where: { id } });
    }

    @Override()
    async findByIdAndLeaderId(id: number, leaderId: number): Promise<Party | null> {
        return await this.repository.findOne({where: { id: id , leader: { studentId: leaderId } }, relations: ['leader'] });
    }

    @Override()
    async deleteById(id: number) {
        await this.repository.delete({ id });
    }

    @Override()
    async delete(entity: Party) {
        await this.repository.remove(entity);
    }

    @Override()
    async update(entity: Party) {
        await this.repository.update({ id: entity.id }, entity);
    }
}