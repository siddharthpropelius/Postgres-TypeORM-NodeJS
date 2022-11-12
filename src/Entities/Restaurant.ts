import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category';
import { FoodItems } from './FoodList';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  img: string;

  @Column()
  description: string;

  @Column()
  opens_at: number;

  @Column()
  close_at: number;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.restaurant, {
    onDelete: 'CASCADE',
  })
  category: Category[];

  @OneToMany(() => FoodItems, (fooditems) => fooditems.restaurant, {
    onDelete: 'CASCADE',
  })
  fooditems: FoodItems[];
}
