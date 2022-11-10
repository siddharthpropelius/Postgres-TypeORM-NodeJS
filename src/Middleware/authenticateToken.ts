import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authenticateToken = (req: any, res: any, next: any) => {
  try {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const authHeader = req.headers['authorization'];
    if (authHeader && ACCESS_TOKEN) {
      const token = authHeader.split(' ')[1];
      const verifyToken: any = jwt.verify(token, ACCESS_TOKEN);
      req.app.set('userId', verifyToken.userId);
      next();
    } else {
      res.status(401).send({ message: 'Unauthenticated user!' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'No token provided!' });
  }
};

export default authenticateToken;
