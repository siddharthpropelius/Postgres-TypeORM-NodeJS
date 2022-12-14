import { DataSource } from 'typeorm';
import { User } from './Entities/User';
import { Restaurant } from './Entities/Restaurant';
import { Category } from './Entities/Category';
import { MetaData } from './Entities/MetaData';
import { Orders } from './Entities/Orders';
import { FoodItems } from './Entities/FoodList';
import { Items } from './Entities/Items';

import express from 'express';
import cors from 'cors';

import { userRouter } from './Routes/User';
import { restaurantRouter } from './Routes/Restaurant';
import { categoryRouter } from './Routes/Category';
import { metaRouter } from './Routes/Metadata';
import { ordersRouter } from './Routes/Orders';
import { foodRouter } from './Routes/Foodlist';

const app = express();
const PORT = 5000;

const main = async () => {
  const connection = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'food_app',
    synchronize: true,
    entities: [User, Restaurant, Category, MetaData, Orders, FoodItems, Items],
  });

  connection
    .initialize()
    .then(() => {
      console.log(`DATABASE CONNECTED`);
      app.use(express.json());
      app.use(cors());

      app.use(userRouter);
      app.use(restaurantRouter);
      app.use(categoryRouter);
      app.use(metaRouter);
      app.use(ordersRouter);
      app.use(foodRouter);

      app.listen(PORT, () => {
        console.log(`SERVER STARTED ON ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`DATABASE DOES NOT CONNECTED `, err);
    });
};

main();
