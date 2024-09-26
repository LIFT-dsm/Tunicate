import { Injectable } from "@nestjs/common";
import { PartyOpenDto } from "../dto/party-open.dto";

/**
 * 새로운 파티를 생성하는 클래스 
 * 구현체: PartyOpenService
 * 
 * @author seung won
 */
@Injectable()
export abstract class PartyOpenUseCase {
    /**
     * 파티 생성 메서드
     * 
     * @param dto PartyOpenDto
     * @returns void
     */
    abstract open(dto: PartyOpenDto): Promise<void>;
}