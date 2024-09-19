import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { PartyOpenUseCase } from "../usecase/party.open.usecase";
import { PartyCancelUseCase } from "../usecase/party.cancel.usecase";
import { PartyUpdateUseCase } from "../usecase/party.update.usecase";
import { PartyOpenDto } from "../dto/party-open.dto";
import { PartyUpdateDto } from "../dto/party-update.dto";

@Controller('party')
export class PartyController {
    constructor(
        private readonly openUseCase: PartyOpenUseCase,
        private readonly cancelUseCase: PartyCancelUseCase,
        private readonly updateUseCase: PartyUpdateUseCase
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: PartyOpenDto) {
        await this.openUseCase.open(dto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancel(@Param('id') id: number) {
        await this.cancelUseCase.cancel(id)
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: number, @Body() dto: PartyUpdateDto) {
        await this.updateUseCase.update(id, dto)
    }
}