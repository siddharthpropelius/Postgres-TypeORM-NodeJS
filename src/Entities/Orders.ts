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
} from 'typeorm';
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

  @ManyToMany(() => Items, (items) => items.orders, {
    onDelete: 'CASCADE',
  })
  items: Items[];
}
