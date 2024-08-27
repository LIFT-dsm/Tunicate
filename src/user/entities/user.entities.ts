import { configDotenv } from 'dotenv';
import { Entity } from 'typeorm';

configDotenv();

@Entity()
export class User {}
