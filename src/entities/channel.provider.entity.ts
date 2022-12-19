import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum TableStatus {
  EMPTY = 'EMPTY',
  USING = 'USING',
  PAYMENT = 'PAYMENT',
}

@Entity('mock_channel_provider')
export class ChannelProviderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  channel_id: number;

  @Column()
  table_id: number;

  @Column()
  course_id: number;

  @Column({ type: 'enum', enum: TableStatus })
  status: TableStatus;

  @Column({ default: () => 'NOW()' })
  time_start: Date;

  @Column({ nullable: true })
  time_end: Date;
}
