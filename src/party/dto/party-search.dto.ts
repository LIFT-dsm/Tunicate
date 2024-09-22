import { User } from "src/user/entities/user.entities"

export class PartySearchResponseDto {
    data: PartySearchDto[]
}

export class PartySearchDto {
    id: number

    name: string

    startDate: string

    endDate: string

    destination: string

    leader: User

}