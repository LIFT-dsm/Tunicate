import { Injectable } from "@nestjs/common";
import { PartyUpdateDto } from "../dto/party-update.dto";

@Injectable()
export abstract class PartyUpdateUseCase {
    abstract update(id: number, dto: PartyUpdateDto);
}