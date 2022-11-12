import { Orders } from '../Entities/Orders';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { FoodItems } from '../Entities/FoodList';

@Entity('items')
export class Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Orders, (orders) => orders.items, { onDelete: 'CASCADE' })
  @JoinTable()
  orders: Orders[];

  @ManyToOne(() => FoodItems, (fooditems) => fooditems.items, {
    onDelete: 'CASCADE',
  })
  fooditems: FoodItems;
}
