import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
export enum MENU_TYPE {
  APPETIZER,
  MAIN,
  DESSERT,
  DRINK,
}

@Entity('mock_menu')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column()
  menu_name: string;

  @Column({ type: 'enum', enum: MENU_TYPE })
  menu_type: MENU_TYPE;

  @Column({ default: 0 })
  price: number;

  @Column({ default: true })
  available: boolean;

  @Column()
  course_id: number;
}
