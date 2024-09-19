import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Party {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 100 })
    name!: string

    @Column()
    startDate!: string

    @Column()
    endDate!: string

    @Column({ length: 255 })
    destination!: string

    @Column({ length: 6, charset: 'ascii' })
    code!: string

    // TODO: user_id column 
}