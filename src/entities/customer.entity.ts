import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Customer')
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
