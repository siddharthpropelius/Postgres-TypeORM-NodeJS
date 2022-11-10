import { DataSource } from 'typeorm';
import { User } from './Entities/User';
import { Restaurant } from './Entities/Restaurant';
import { Category } from './Entities/Category';
import { MetaData } from './Entities/MetaData';
import { Orders } from './Entities/Orders';
import { FoodList } from './Entities/FoodList';

import express from 'express';
import cors from 'cors';

import { userRouter } from './Routes/User';
import { restaurantRouter } from './Routes/Restaurant';
import { categoryRouter } from './Routes/Category';
import { metaRouter } from './Routes/Metadata';
import { ordersRouter } from './Routes/Orders';
import { foodRouter } from './Routes/Foodlist';
import { Items } from './Entities/Items';


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
    logging: false,
    synchronize: true,
    entities: [
      User,
      Restaurant,
      Category,
      MetaData,
      Orders,
      FoodList,
      Items,

    ],
  });

  connection
    .initialize()
    .then(() => {
      console.log(`Database has been connected`);
      app.use(express.json());
      app.use(cors());

      app.use(userRouter);
      app.use(restaurantRouter);
      app.use(categoryRouter);
      app.use(metaRouter);
      app.use(ordersRouter);
      app.use(foodRouter);

      app.listen(PORT, () => {
        console.log(`SERVER IS STARTED ON ${PORT} ENJOY`);
      });
    })
    .catch((err) => {
      console.error(`Database could not be connected `, err);
    });
};

main();
