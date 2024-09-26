import { IsObject, IsString } from "class-validator";
import { User } from "src/user/entities/user.entities";

export class PartyOpenDto {
    @IsObject()
    user: User;  

    @IsString()
    readonly partyName: string;

    @IsString()
    readonly startDate: string;

    @IsString()
    readonly endDate: string;

    @IsString()
    readonly destination: string;
}