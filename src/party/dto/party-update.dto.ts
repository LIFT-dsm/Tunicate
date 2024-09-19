import { IsString } from "class-validator";

export class PartyUpdateDto {
    @IsString()
    readonly partyName: string;

    @IsString()
    readonly startDate: string;

    @IsString()
    readonly endDate: string;

    @IsString()
    readonly destination: string;
}