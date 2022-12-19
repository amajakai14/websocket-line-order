import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('mock_order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  menu_id: string;

  @Column()
  order_amount: number;

  @Column()
  total_price: number;

  @Column()
  channel_id: string;

  @Column()
  process_type: string;

  @Column({ default: () => 'NOW()' })
  register_time: Date;

  @Column({ nullable: true })
  update_time: Date;
}
