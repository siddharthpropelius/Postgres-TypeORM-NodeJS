import { Orders } from '../Entities/Orders';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { FoodList } from '../Entities/FoodList';

@Entity('items')
export class Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;

  @ManyToMany(() => Orders, (orders) => orders.items,{onDelete:"CASCADE"})
  @JoinTable()
  orders: Orders[];

  @ManyToOne(() => FoodList, (foodlist) => foodlist.items)
  foodlist: FoodList;
  

  // @ManyToOne(() => FoodList, (foodlist) => foodlist.items)
  // foodlist: FoodList;
  // @JoinColumn()
  // @OneToMany(() => Orders_items, (orders_items) => orders_items.items)
  // orders_items: Orders_items[];
}
