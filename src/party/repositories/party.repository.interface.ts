import { Injectable } from "@nestjs/common";
import { Party } from "../entities/party.entities";

/**
 * DI를 위한 추상 클래스입니다.
 * 
 * Party Repository의 기본 동작을 정의합니다.
 */
@Injectable()
export abstract class PartyRepositoryInterface {
    /**
     * 
     * @param entity 
     * @returns 따로 반환 값을 사용하지 않으므로. void 반환
     */
    abstract save(entity: Party)

    /**
     * @param id 찾고 싶은 Party 고유키
     * @returns 찾은 경우 PartyEntity를 반환, 찾지 못한 경우 undefined 반환
     */
    abstract findById(id: number): Promise<Party | null>
}