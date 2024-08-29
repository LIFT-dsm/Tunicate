import { IsString } from "class-validator";

export class CreatePartyDto {
    @IsString()
    readonly party_name: string;

    @IsString()
    readonly start_date: string;

    @IsString()
    readonly end_date: string;

    @IsString()
    readonly destination: string;
}