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
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../Entities/Restaurant';
import { Orders } from '../Entities/Orders';
import { Items } from '../Entities/Items';

@Entity('foodlist')
export class FoodList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  img: string;
  @Column()
  des: string;
  @Column()
  price: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Category, (category) => category.foodlist, {
    onDelete: 'CASCADE',
    cascade: ['update'],
  })
  category: Category;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodlist, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => Items, (items) => items.foodlist)
  items: Items[];

  // @OneToMany(() => Orders, (orders) => orders.foodlist, {
  //   onDelete: 'CASCADE',
  // })
  // orders: Orders[];

  // @OneToMany(() => Items, (items) => items.foodlist)
  // items: Items[];
}
