import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type : 'varchar', length : 255})
    fullName: string;

    @Column({ type : 'varchar', length : 255, unique : true})
    email: string;

    @Column({ type : 'varchar', length : 255})
    password: string;

    @OneToMany(() => Role, (role) => role.user)
    @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
    roles: Role[];

    @Column({ type : 'varchar', length : 255, nullable : true})
    roleId: string;

    @CreateDateColumn({ type : 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({ type : 'timestamp with time zone'})
    updatedAt: Date;
}
