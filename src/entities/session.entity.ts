import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('mock_session')
export class SessionEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  session_id: string;

  @Column({ type: 'int' })
  customer_id: number;

  @CreateDateColumn()
  create_at: Date;
}
