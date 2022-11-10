import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category';
import { FoodList } from './FoodList';
import { Orders } from '../Entities/Orders';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  img: string;
  @Column()
  des: string;
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

  // @OneToMany(() => Orders, (orders) => orders.restaurant, {
  //   onDelete: 'CASCADE',
  // })
  // orders: Orders[];

  @OneToMany(() => FoodList, (foodlist) => foodlist.category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  foodlist: FoodList[];
}
