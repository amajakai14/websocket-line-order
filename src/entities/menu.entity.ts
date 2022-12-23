import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum MenuType {
  APPETIZER = 'APPETIZER',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  DRINK = 'DRINK',
  INVALID = 'INVALID',
}

@Entity('mock_menu')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column()
  menu_name: string;

  @Column({ type: 'enum', enum: MenuType })
  menu_type: MenuType;

  @Column({ default: 0 })
  price: number;

  @Column({ default: true })
  available: boolean;

  @Column()
  course_id: number;
}
