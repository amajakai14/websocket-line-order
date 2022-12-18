import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
