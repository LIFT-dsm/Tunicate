import { User } from "src/user/entities/user.entities";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => User, (user) => user.studentId, { cascade: true })
    @JoinTable({ 
        name: 'party_members',
        joinColumns: [{ name: 'party_id'}, { referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'member_id'}, {referencedColumnName: 'studentId' }]
    })
    members?: User[]
}