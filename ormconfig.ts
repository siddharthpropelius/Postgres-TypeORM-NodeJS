import { User } from './src/Entities/User';
import { Restaurant } from './src/Entities/Restaurant';
import { Category } from './src/Entities/Category';
import { MetaData } from './src/Entities/MetaData';
import { Orders } from './src/Entities/Orders';
import { FoodItems } from './src/Entities/FoodList';
import { Items } from './src/Entities/Items';

export const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'food_app',
  synchronize: true,
  entities: [User, Restaurant, Category, MetaData, Orders, FoodItems, Items],
};
