import { Injectable } from "@nestjs/common";
import { PartyCancelDto } from "../dto/party-cancel.dto";

@Injectable()
export abstract class PartyCancelUseCase {
    abstract cancel(id: number, dto: PartyCancelDto): Promise<void>;
}