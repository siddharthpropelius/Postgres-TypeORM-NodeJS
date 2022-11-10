import express from 'express';
import { MetaData } from '../Entities/MetaData';

export const metaData = async (req: express.Request, res: express.Response) => {
  try {
    const find = await MetaData.find({});
    res.status(200).send({ data: find });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const byId = async (req: express.Request, res: express.Response) => {
  try {
    const { metaId } = req.query;
    if (metaId) {
      const find = await MetaData.findOneBy({ id: +metaId });
      if (find) {
        res.status(200).send({ data: find });
      } else {
        res.status(404).send({ message: 'Meta does not exists!' });
      }
    } else {
      res.status(400).send({ message: 'Invalid query params' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addMeta = async (req: express.Request, res: express.Response) => {
  try {
    const { metaName, metaDescription, metaAuthor, metaKeyword } = req.body;
    const find_meta = await MetaData.findOneBy({ metaName: metaName });
    if (!find_meta) {
      MetaData.createQueryBuilder()
        .insert()
        .into(MetaData)
        .values(req.body)
        .execute();
      res.status(200).send({ message: 'Meta Added!' });
    } else {
      res.status(400).send({ message: 'Meta already exists!' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteMeta = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { metaId } = req.query;
    if (metaId) {
      const meta = await MetaData.findOne({ where: { id: +metaId } });
      if (meta) {
        MetaData.createQueryBuilder()
          .delete()
          .from(MetaData)
          .where('id= :id', { id: +metaId })
          .execute();
        res.status(200).send({ message: 'MetaData Deleted!' });
      } else {
        res
          .status(404)
          .send({ message: `MetaData with id ${metaId} does not exists!` });
      }
    } else {
      res.status(400).send({ message: 'Invalid query params!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { metaData, byId, addMeta, deleteMeta };
