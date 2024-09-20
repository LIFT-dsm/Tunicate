import { Injectable } from "@nestjs/common";
import { Party } from "../entities/party.entities";

/**
 * DI를 위한 추상 클래스입니다.
 * 
 * Party Repository의 기본 동작을 정의합니다.
 * @author seung won
 */
@Injectable()
export abstract class PartyRepository {
    /**
     * @param entity 
     */
    abstract save(entity: Party)

    /**
     * @param id 찾고 싶은 Party 고유키
     * @returns 찾은 경우 PartyEntity를 반환, 찾지 못한 경우 null 반환
     */
    abstract findById(id: number): Promise<Party | null>

    abstract findByIdAndLeaderId(id: number, leaderId: number): Promise<Party | null>

    /**
     * 
     * @param id 찾고 싶은 Party 고유키
     */
    abstract deleteById(id: number)
    
    abstract delete(entity: Party)

    /**
     * @param entity
     */
    abstract update(entity: Party)
}