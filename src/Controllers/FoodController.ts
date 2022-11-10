import express from 'express';
import { FoodList } from '../Entities/FoodList';
import { Category } from '../Entities/Category';
import { Restaurant } from '../Entities/Restaurant';

export const food = async (req: express.Request, res: express.Response) => {
  try {
    const { restaurantId, categoryId, foodId } = req.query;
    if (restaurantId && categoryId && foodId) {
      res.status(400).send({ message: 'Invalid query params' });
    } else if (restaurantId && categoryId) {
      const find_restaurant = await Restaurant.findOneBy({ id: +restaurantId });
      const find_category = await Category.findOneBy({ id: +categoryId });
      if (find_category && find_restaurant) {
        const foods = await FoodList.find({
          relations: { category: true, restaurant: true },
          where: {
            restaurant: { id: +restaurantId },
            category: { id: +categoryId },
          },
        });
        res.status(200).send({ data: foods });
      }
    } else if (restaurantId) {
      const find_restaurant = await Restaurant.findOneBy({ id: +restaurantId });
      if (find_restaurant) {
        const foods = await FoodList.find({
          relations: { restaurant: true },
          where: { restaurant: { id: +restaurantId } },
        });
        res.status(200).send({ data: foods });
      } else {
        res.status(404).send({ message: 'Restaurant does not found!' });
      }
    } else if (categoryId) {
      const find_category = await Category.findOneBy({ id: +categoryId });
      if (find_category) {
        const foods = await FoodList.find({
          relations: { category: true, restaurant: true },
          where: { category: { id: +categoryId } },
        });
        res.status(200).send({ data: foods });
      }
    } else if (foodId) {
      const find_food = await FoodList.findOneBy({ id: +foodId });
      if (find_food) {
        const orders = await FoodList.find({
          where: { id: +foodId },
        });
        res.status(200).send({ data: orders });
      } else {
        res.status(404).send({ message: 'Food does not exists!' });
      }
    } else {
      const find = await FoodList.find({
        relations: { restaurant: true, category: true },
      });
      res.send({ data: find });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const addFood = async (req: express.Request, res: express.Response) => {
  try {
    const { name, category, price, img, des, rId } = req.body;
    const find_restaurant = await Restaurant.findOneBy({ id: rId });
    const find_category = await Category.findOneBy({ name: category });
    const find = await Restaurant.find({
      relations: { category: true },
      where: {
        id: rId,
        category: {
          name: category,
        },
      },
    });

    if (find.length && find_restaurant && find_category) {
      const food = new FoodList();
      food.name = name;
      food.price = price;
      food.img = img;
      food.des = des;
      food.restaurant = find_restaurant;
      food.category = find_category;
      await FoodList.save(food);
      res.send({ message: 'Food Added!' });
    } else {
      res.send({ message: 'Restaurant or Category does not exists!' });
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const deleteFood = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const food = await FoodList.findOne({ where: { id: parseInt(id) } });
    if (food) {
      FoodList.createQueryBuilder()
        .delete()
        .from(FoodList)
        .where('id= :id', { id: id })
        .execute();
      res.send({ message: 'Food Item Deleted!' });
    } else {
      res.send({ message: '404 NOT FOUND' });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

module.exports = { food, addFood, deleteFood };
