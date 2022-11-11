import express from 'express';
import { FoodItems } from '../Entities/FoodList';
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
        const foods = await FoodItems.find({
          relations: { category: true, restaurant: true },
          where: {
            restaurant: { id: +restaurantId },
            category: { id: +categoryId },
          },
        });
        res.status(200).send({ data: foods });
      } else {
        res
          .status(404)
          .send({ message: 'Restaurant or Category does not found!' });
      }
    } else if (restaurantId) {
      const find_restaurant = await Restaurant.findOneBy({ id: +restaurantId });
      if (find_restaurant) {
        const foods = await FoodItems.find({
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
        const foods = await FoodItems.find({
          relations: { category: true, restaurant: true },
          where: { category: { id: +categoryId } },
        });
        res.status(200).send({ data: foods });
      } else {
        res.status(400).send({ message: 'Category does not found!' });
      }
    } else if (foodId) {
      const find_food = await FoodItems.findOneBy({ id: +foodId });
      if (find_food) {
        const orders = await FoodItems.find({
          where: { id: +foodId },
        });
        res.status(200).send({ data: orders });
      } else {
        res.status(404).send({ message: 'Food does not found!' });
      }
    } else {
      const find = await FoodItems.find({
        relations: { restaurant: true, category: true },
      });
      res.status(200).send({ data: find });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addFood = async (req: express.Request, res: express.Response) => {
  try {
    const { restaurantId } = req.query;
    const { name, categoryId, price, img, description } = req.body;
    if (
      typeof name == 'string' &&
      typeof categoryId == 'number' &&
      typeof price == 'number' &&
      typeof img == 'string' &&
      typeof description == 'string'
    ) {
      if (restaurantId) {
        const find_restaurant = await Restaurant.findOneBy({
          id: +restaurantId,
        });
        const find_category = await Category.findOneBy({ id: categoryId });
        const find = await Restaurant.find({
          relations: { category: true },
          where: {
            id: +restaurantId,
            category: {
              id: categoryId,
            },
          },
        });

        if (find.length && find_restaurant && find_category) {
          const food = new FoodItems();
          food.name = name;
          food.price = price;
          food.img = img;
          food.description = description;
          food.restaurant = find_restaurant;
          food.category = find_category;
          await FoodItems.save(food);
          res.status(200).send({ message: 'Food Added!' });
        } else {
          res
            .status(404)
            .send({ message: 'Restaurant or Category does not found!' });
        }
      }
    } else {
      res.status(400).send({ message: 'Invalid input!' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteFood = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const food = await FoodItems.findOne({ where: { id: parseInt(id) } });
    if (food) {
      FoodItems.createQueryBuilder()
        .delete()
        .from(FoodItems)
        .where('id= :id', { id: id })
        .execute();
      res.status(200).send({ message: 'Food Item Deleted!' });
    } else {
      res.status(404).send({ message: 'Food does not found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { food, addFood, deleteFood };
