import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Party {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    start_date!: string

    @Column()
    end_date!: string

    @Column()
    destination!: string
}