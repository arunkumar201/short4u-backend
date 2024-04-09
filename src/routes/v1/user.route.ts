import { ZLoginMiddleware, ZUserEmail, ZUserMiddleware } from 'validations/auth';
import {
  create,
  get,
  getUser,
  login,
  remove,
  update,
} from '../../controllers/user.controller';
import express, { Request, Response } from 'express';

import { authLimiter } from '../../middleware/limiter/auth-limiter.middleware';
import { requireAdminAuth } from '../../middleware/auth/admin.middleware';
import { requireUserAuth } from '../../middleware/auth/auth.middleware';
import { validate } from '../../utils/user';

type T = never;

const userRoutes = express.Router();

//GET APIS COLLECTIONS
userRoutes.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to the Short4u Url shortener service' });
});

userRoutes.get('/users', authLimiter, requireAdminAuth as T, get);
userRoutes.get(
  'admin/:email',
  validate(ZUserEmail),
  authLimiter,
  requireAdminAuth as T,
  getUser,
);

userRoutes.get(
  '/:email',
  validate(ZUserEmail),
  authLimiter,
  requireUserAuth as T,
  getUser,
);
//post
userRoutes.post('/login', validate(ZLoginMiddleware), authLimiter, login);
userRoutes.post('/new-user', validate(ZUserMiddleware), authLimiter, create);

//delete
userRoutes.delete('/delete-user', validate(ZUserMiddleware), authLimiter, remove);
//put
userRoutes.put('/update-user', authLimiter, update);

export default userRoutes;
