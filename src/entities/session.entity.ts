import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';

@Entity('mock_session')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  session_id: string;

  @Column({ type: 'int' })
  customer_id: string;

  @Column({ type: 'timestamp', default: () => "NOW() + INTERVAL '24 hours'" })
  expire_datetime: Date;

  @BeforeInsert()
  expireDateTime() {
    this.expire_datetime = new Date(
      this.expire_datetime.getTime() + 24 * 60 * 60 * 1000,
    );
  }
}
