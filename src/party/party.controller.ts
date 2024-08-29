import { Body, Controller, Post } from "@nestjs/common";
import { PartyService } from "./party.service";
import { CreatePartyDto } from "./dto/create-party.dto";

@Controller('party')
export class PartyController {
    constructor(
        private readonly service: PartyService
    ) {}

    @Post()
    create(@Body() dto: CreatePartyDto) {
        return this.service.create(dto)
    }
}