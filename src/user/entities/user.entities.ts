import { configDotenv } from 'dotenv';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

configDotenv();

export enum Gender {
  'MALE' = 'MALE',
  'FEMALE' = 'FEMALE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({
    type: 'varchar',
    length: 100,
    default: process.env.DEFAULT_PROFILE_URL,
  })
  profile: string;
}
