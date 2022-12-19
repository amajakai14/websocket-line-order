import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm';

@Entity('mock_customer')
@Unique(['login_id', 'email'])
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
