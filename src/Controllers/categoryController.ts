import express from 'express';
import { Category } from '../Entities/Category';

export const getCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const find = await Category.find({
      relations: {
        restaurant: true,
        foodlist: true,
      },
    });
    res.send(find);
  } catch (err) {
    res.send(err.message);
  }
};

export const addCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    const find_category = await Category.findOneBy({ name: name });
    if (!find_category) {
      await Category.createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: name })
        .orUpdate({ conflict_target: ['name'], overwrite: ['name'] })
        .returning('*')
        .execute();
      res.send({ message: 'Category Added!' });
    } else {
      res.status(400).send({ message: 'Category already exists!' });
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { categoryId } = req.query;
    if (categoryId) {
      const find_category = await Category.findOneBy({ id: +categoryId });
      if (find_category) {
        await Category.delete({ id: +categoryId });
        res.status(200).send({ message: 'Category Deleted!' });
      } else {
        res.status(404).send({ message: 'Category does not exists!' });
      }
    } else {
      res.status(404).send({ message: 'Invalid query params!' });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { getCategory, addCategory, deleteCategory };
