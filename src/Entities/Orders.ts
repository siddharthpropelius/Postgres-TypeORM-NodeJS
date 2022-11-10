import { User } from '../Entities/User';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Restaurant } from '../Entities/Restaurant';
import { FoodList } from '../Entities/FoodList';
import { Items } from '../Entities/Items';

@Entity('orders')
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  discount: number;
  @Column()
  subtotal: number;
  @Column()
  total: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  user: User;

  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // restaurant: Restaurant;

  // @ManyToOne(() => FoodList, (foodlist) => foodlist.orders)
  // foodlist = FoodList;

  // @OneToMany(() => Orders_items, (orders_items) => orders_items.orders)
  // orders_items: Orders_items[];

  @ManyToMany(() => Items, (items) => items.orders, {
    onDelete: 'CASCADE',
  })
  items: Items[];
}
