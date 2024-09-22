import { User } from "src/user/entities/user.entities"

export class PartyDetailDto {
    id: number

    name: string

    startDate: string

    endDate: string

    destination: string

    leader: User

    members: User[]
}