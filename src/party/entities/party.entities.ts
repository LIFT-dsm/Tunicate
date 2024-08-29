import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Party {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    startDate: string

    @Column()
    endDate: string

    @Column()
    destination: string
}