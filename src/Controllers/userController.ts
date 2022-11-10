import * as dotenv from 'dotenv';
import { User } from '../Entities/User';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

dotenv.config();
let refreshTokens = [];

export const users = async (req: express.Request, res: express.Response) => {
  try {
    const get = await User.find();
    res.send({ data: get });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

export const userLogin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors });
    } else {
      const { email, password } = req.body;
      const findUser = await User.findOneBy({ email: email });
      if (findUser && process.env.ACCESS_TOKEN) {
        const correctPassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (
          correctPassword &&
          process.env.ACCESS_TOKEN &&
          process.env.REFRESH_TOKEN
        ) {
          const generateAccessToken = jwt.sign(
            {
              userId: findUser.id,
              email: findUser.email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
          );
          const generateRefreshToken = jwt.sign(
            {
              userId: findUser.id,
              email: findUser.email,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: '30d' }
          );
          refreshTokens.push(generateRefreshToken);
          res.status(200).send({
            user: findUser,
            accessToken: generateAccessToken,
            refreshToken: generateRefreshToken,
          });
        } else {
          res.status(400).send({ message: 'Invalid password!' });
        }
      } else {
        res.status(404).send({ message: 'User not found!' });
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const addUser = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors });
    } else {
      const { name, email, password } = req.body;
      const existing = await User.findOneBy({ email: email });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        User.createQueryBuilder()
          .insert()
          .into(User)
          .values({ name: name, email: email, password: hashedPassword })
          .execute();
        res.status(200).send({ message: 'User created!' });
      } else {
        res.status(400).send({ message: 'User Already Exists' });
      }
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.app.get('userId');
    const { password } = req.query;
    console.log(typeof userId, typeof password);

    if (userId && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const findUser = await User.findOneBy({ id: +userId });
      if (findUser) {
        await User.update({ id: +userId }, { password: hashedPassword });
        res
          .status(200)
          .send({ message: 'Password has been updated successfully!' });
      } else {
        res.status(404).send({ message: "User doesn't exists!" });
      }
    } else {
      console.log('error');
    }
  } catch (err) {
    res.send(err.message);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findOneBy({ id: +userId });
      if (user) {
        await User.delete({ id: +userId });
        res.send({ message: 'User Deleted!' });
      } else {
        res.status(404).send({ message: 'User does not found!' });
      }
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

export const refreshToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken == null)
      res.status(400).send({
        message: 'No refresh token available to generate access token',
      });
    if (!refreshToken.includes(refreshToken)) {
      res.status(401).send({ message: 'Unauthenticated user' });
    } else if (process.env.REFRESH_TOKEN && process.env.ACCESS_TOKEN) {
      const validRefreshToken: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN
      );
      console.log('VALID========', validRefreshToken);
      const newAccessToken = jwt.sign(
        { userId: validRefreshToken.userId, email: validRefreshToken.email },
        process.env.ACCESS_TOKEN
      );
      res.status(200).send({ newAccessToken });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  users,
  userLogin,
  addUser,
  updatePassword,
  deleteUser,
  refreshToken,
};
