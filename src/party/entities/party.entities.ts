import { User } from "src/user/entities/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User, (user) => user.studentId, { cascade: true })
    @JoinColumn({ name: 'leader' })
    leader?: User
}