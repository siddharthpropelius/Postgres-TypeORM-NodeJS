import { FoodList } from '../Entities/FoodList';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.category, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  restaurant: Restaurant[];

  @OneToMany(() => FoodList, (foodlist) => foodlist.category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  foodlist: FoodList[];
}
