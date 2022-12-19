import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('mock_table')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  table_id: number;

  @Column()
  table_name: string;

  @Column()
  customer_id: number;
}
