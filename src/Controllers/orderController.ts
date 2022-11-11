import express from 'express';
import { Orders } from '../Entities/Orders';
import { User } from '../Entities/User';
import { FoodItems } from '../Entities/FoodList';
import { Items } from '../Entities/Items';

export const orders = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.app.get('userId');
    const { orderId } = req.query;
    if (orderId && userId) {
      res.status(400).send('Invalid query params!');
    } else if (userId) {
      const find_user = await User.findOneBy({ id: +userId });
      if (find_user) {
        const orders = await Orders.find({
          relations: { user: true, items: { fooditems: { restaurant: true } } },
          where: { user: { id: +userId } },
        });
        res.status(200).send({ data: orders });
      } else {
        res.status(404).send({ message: 'User does not found!' });
      }
    } else if (orderId) {
      const find_order = await Orders.findOneBy({ id: +orderId });
      if (find_order) {
        const orders = await Orders.find({
          where: { id: +orderId },
          relations: { user: true, items: { fooditems: { restaurant: true } } },
        });
        res.status(200).send({ data: orders });
      } else {
        res.status(404).send({ message: 'Order does not found!' });
      }
    } else {
      const find = await Orders.find({
        relations: { user: true, items: { fooditems: { restaurant: true } } },
      });
      res.status(200).send({ data: find });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { orderId } = req.query;
    if (orderId) {
      const find_order = await Orders.findOneBy({ id: +orderId });
      if (find_order) {
        await Orders.delete({ id: +orderId });
        res.status(200).send({ message: 'Order Deleted!' });
      } else {
        res.status(404).send({ message: 'Order does not found!' });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const addOrder = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.app.get('userId');
    const { items, discount } = req.body;
    console.log(typeof items);
    const find_userId = await User.findOneBy({ id: userId });
    if (find_userId) {
      let subTotal = 0;
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        const find_food = await FoodItems.findOneBy({ id: items[i].foodId });
        if (find_food)
          subTotal = subTotal + items[i].quantity * find_food.price;
      }
      total = subTotal - (subTotal * discount) / 100;
      const order = await Orders.createQueryBuilder()
        .insert()
        .into(Orders)
        .values({
          user: find_userId,
          subtotal: subTotal,
          total: total,
          discount: discount,
        })
        .returning('*')
        .execute();
      items.map(async (item: any) => {
        const find_food = await FoodItems.findOneBy({ id: item.foodId });
        if (find_food && order) {
          const items = new Items();
          items.quantity = item.quantity;
          items.fooditems = find_food;
          items.orders = order.raw;
          await Items.save(items);
        }
      });
      res.status(200).send({ message: 'Order placed!' });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
};
module.exports = { orders, deleteOrder, addOrder };
