import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('mock_course')
export class CourseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  course_name: string;

  @Column()
  course_timelimit: number;

  @Column()
  course_priority: number;
}
