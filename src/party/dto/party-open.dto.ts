import { IsString } from "class-validator";

export class PartyOpenDto {
    @IsString()
    readonly partyName: string;

    @IsString()
    readonly startDate: string;

    @IsString()
    readonly endDate: string;

    @IsString()
    readonly destination: string;
}