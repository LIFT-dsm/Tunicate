import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Party } from "../entities/party.entities"
import { PartyRepositoryInterface } from "./party.repository.interface";

@Injectable()
export class PartyRepository implements PartyRepositoryInterface {
    constructor(
        @InjectRepository(Party)
        private readonly repository: Repository<Party>
    ) {}

    async save(entity: Party) {
        await this.repository.save(entity);
    }

    async findById(id: number): Promise<Party | undefined> {
        return await this.repository.findOne({where: { id } });
    }
}