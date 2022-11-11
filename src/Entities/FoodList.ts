import { Category } from '../Entities/Category';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Restaurant } from '../Entities/Restaurant';
import { Items } from '../Entities/Items';

@Entity('foodItems')
export class FoodItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  img: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Category, (category) => category.fooditems, {
    onDelete: 'CASCADE',
    cascade: ['update'],
  })
  category: Category;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.fooditems, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => Items, (items) => items.fooditems)
  items: Items[];
}
