import express from 'express';
import { Restaurant } from '../Entities/Restaurant';
import { Category } from '../Entities/Category';

export const restaurant = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const find = await Restaurant.find({
      relations: { category: true, fooditems: true },
    });
    res.status(200).send({ data: find });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const restaurantById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { restaurantId } = req.query;
    if (restaurantId) {
      const find = await Restaurant.find({
        where: {
          id: +restaurantId,
        },
        relations: { category: true, fooditems: true },
      });
      res.status(200).send({ data: find });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addRestaurant = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, img, description, opens_at, close_at, location, category } =
      req.body;
    if (
      typeof name == 'string' &&
      typeof img == 'string' &&
      typeof description == 'string' &&
      typeof location == 'string' &&
      typeof opens_at == 'number' &&
      typeof close_at == 'number'
    ) {
      const categories = await Category.createQueryBuilder()
        .insert()
        .into(Category)
        .values(category)
        .orUpdate({ conflict_target: ['name'], overwrite: ['name'] })
        .returning('*')
        .execute();

      const restaurant = new Restaurant();
      restaurant.name = name;
      restaurant.img = img;
      restaurant.description = description;
      restaurant.opens_at = opens_at;
      restaurant.close_at = close_at;
      restaurant.location = location;
      restaurant.category = categories.raw;
      await Restaurant.save(restaurant);
      res.status(200).send({ message: 'Added!' });
    } else {
      res.status(400).send({ message: 'Invalid input!' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteRestaurant = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { restaurantId } = req.query;
    if (restaurantId) {
      const restaurant = await Restaurant.findOneBy({ id: +restaurantId });
      if (restaurant) {
        await Restaurant.delete({ id: +restaurantId });
        res.status(200).send({ message: 'Restaurant Deleted!' });
      } else {
        res.status(404).send({ message: 'Restaurant does not exists!' });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const linkCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { restaurantId, categoryId } = req.query;
    if (restaurantId && categoryId) {
      const find_restaurant = await Restaurant.findOne({
        where: { id: +restaurantId },
        relations: { category: true },
      });

      const find_category = await Category.findOneBy({ id: +categoryId });
      if (find_restaurant && find_category) {
        const category = await Category.createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: find_category.name })
          .orUpdate({ conflict_target: ['name'], overwrite: ['name'] })
          .returning('*')
          .execute();
        find_restaurant.category = [
          ...find_restaurant.category,
          ...category.raw,
        ];
        find_restaurant.save();
        res.status(200).send({
          message: `Category ${find_category.name} Linked with Restaurant ${find_restaurant.name}`,
        });
      } else {
        res.status(404).send({ message: "Restaurant didn't exists!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateRestaurant = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { restaurantId } = req.query;
    if (restaurantId) {
      await Restaurant.createQueryBuilder()
        .update(Restaurant)
        .set(req.body)
        .where('id = :id', { id: +restaurantId })
        .returning('*')
        .execute();
      res.status(200).send({ message: `Restaurant Updated!` });
    } else {
      res.status(404).send({ message: 'Restaurant does not found!' });
    }
  } catch (err) {
    if (err.code == 23505) {
      res
        .status(400)
        .send({ message: `${req.body.name} restaurant already exists` });
    } else {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { restaurantId, categoryId } = req.query;
    if (restaurantId && categoryId) {
      const find_restaurant = await Restaurant.findOne({
        where: { id: +restaurantId },
        relations: { category: true },
      });
      const find_category = await Category.findOneBy({ id: +categoryId });
      if (find_restaurant && find_category) {
        find_restaurant.category = find_restaurant.category.filter(
          (category) => {
            return category.name !== find_category.name;
          }
        );
        find_restaurant.save();
        res.status(200).send({
          message: `Category ${find_category.name} removed from Restaurant ${find_restaurant.name} `,
        });
      } else {
        res.status(404).send({ message: "Restaurant didn't exists!" });
      }
    } else {
      res.status(400).send({ message: 'Invalid query params!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  restaurant,
  restaurantById,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
  linkCategory,
  deleteCategory,
};
