import { Injectable } from "@nestjs/common";
import { PartySearchResponseDto } from "../dto/party-search.dto";
import { PartyDetailDto } from "../dto/party-detail.dto";

@Injectable()
export abstract class PartyQueryUseCase {
    abstract search(keyword: string): Promise<PartySearchResponseDto>
    abstract viewDetail(id: number): Promise<PartyDetailDto>
}