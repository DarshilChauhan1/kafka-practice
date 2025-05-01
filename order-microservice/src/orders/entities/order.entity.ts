import { OrderStatus } from "src/common/enums/order-status.enum";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type : 'enum', enum : OrderStatus, default : OrderStatus.PENDING })
    status : OrderStatus;
    
    @Column({ type : 'uuid' })
    userId : string;

    @OneToMany(()=> Product, (product) => product.id, { eager : true })
    @JoinColumn({ name : 'productIds', referencedColumnName : 'id' })
    products : Product[];

    @CreateDateColumn({ type : 'timestamp with time zone' })
    createdAt : Date;

    @UpdateDateColumn({ type : 'timestamp with time zone' })
    updatedAt : Date;
}
