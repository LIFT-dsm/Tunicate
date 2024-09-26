import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PartyOpenUseCase } from "../usecase/party.open.usecase";
import { PartyCancelUseCase } from "../usecase/party.cancel.usecase";
import { PartyUpdateUseCase } from "../usecase/party.update.usecase";
import { PartyOpenDto } from "../dto/party-open.dto";
import { PartyUpdateDto } from "../dto/party-update.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.auth.guard";
import { PartyCancelDto } from "../dto/party-cancel.dto";
import { PartyQueryUseCase } from "../usecase/party.query.usecase";

@Controller('party')
export class PartyController {
    constructor(
        private readonly openUseCase: PartyOpenUseCase,
        private readonly cancelUseCase: PartyCancelUseCase,
        private readonly updateUseCase: PartyUpdateUseCase,
        private readonly queryUseCase: PartyQueryUseCase
    ) {}

    @Get('/search')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async search(@Param('keyword') keyword: string) {
        return await this.queryUseCase.search(keyword)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async viewDetail(@Param('id') id: number) {
        return await this.queryUseCase.viewDetail(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: PartyOpenDto) {
        await this.openUseCase.open(dto)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancel(@Param('id') id: number, @Body() dto: PartyCancelDto) {
        await this.cancelUseCase.cancel(id, dto)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: number, @Body() dto: PartyUpdateDto) {
        await this.updateUseCase.update(id, dto)
    }
}