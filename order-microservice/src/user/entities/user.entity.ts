import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable : true })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
