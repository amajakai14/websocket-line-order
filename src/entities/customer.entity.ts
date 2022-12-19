import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('mock_customer')
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
