import {
  create,
  get,
  getUser,
  login,
  remove,
  update,
} from '../../controllers/user.controller';
import express, { Request, Response } from 'express';
import {
  loginSchema,
  userEmailSchema,
  userSchema,
} from '../../validations/auth';

import { DecodeToken } from '../../utils/decodeToken';
import { authLimiter } from '../../middleware/limiter/auth-limiter.middleware';
import { validate } from '../../utils/user';

const userRoutes = express.Router();

//GET APIS COLLECTIONS
userRoutes.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to the Short4u Url shortener service' });
});

userRoutes.get('/users', authLimiter, get);
userRoutes.get(
  '/:email',
  validate(userEmailSchema),
  authLimiter,
  DecodeToken,
  getUser,
);

//post
userRoutes.post('/login', validate(loginSchema), authLimiter, login);
userRoutes.post('/new-user', validate(userSchema), authLimiter, create);

//delete
userRoutes.delete('/delete-user', authLimiter, remove);
//put
userRoutes.put('/update-user', authLimiter, update);

export default userRoutes;
