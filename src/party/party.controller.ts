import { Body, Controller, Post } from "@nestjs/common";
import { PartyService } from "./party.service";
import { CreatePartyDto } from "./dto/create-party.dto";

@Controller('party')
export class PartyController {
    constructor(
        private readonly service: PartyService
    ) {}

    @Post()
    async create(@Body() dto: CreatePartyDto) {
        await this.service.create(dto)
    }
}