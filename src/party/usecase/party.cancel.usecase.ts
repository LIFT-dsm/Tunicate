import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class PartyCancelUseCase {
    abstract cancel(id: number): Promise<void>;
}