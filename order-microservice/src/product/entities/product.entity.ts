import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length : 255, nullable : false })
    name: string;

    @Column({ type : 'decimal', precision : 10, scale : 2, nullable : false })
    price: number;

    @Column({ length : 255, nullable : true })
    description: string;

    @Column({ length : 255, nullable : true })
    imageUrl: string;

    @Column({ type : 'int', default : 0 })
    stock: number;

    @Column({ type : 'boolean', default : true })
    isActive: boolean;

    @CreateDateColumn({ type : 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type : 'timestamp with time zone' })
    updatedAt: Date;
}
