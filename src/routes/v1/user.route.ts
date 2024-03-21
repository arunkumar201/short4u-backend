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

userRoutes.get('/users', authLimiter, get);
userRoutes.get(
  'admin/:email',
  validate(userEmailSchema),
  authLimiter,
  requireAdminAuth as T,
  getUser,
);

userRoutes.get(
  '/:email',
  validate(userEmailSchema),
  authLimiter,
  requireUserAuth as T,
  getUser,
);
//post
userRoutes.post('/login', validate(loginSchema), authLimiter, login);
userRoutes.post('/new-user', validate(userSchema), authLimiter, create);

//delete
userRoutes.delete('/delete-user', validate(userSchema), authLimiter, remove);
//put
userRoutes.put('/update-user', authLimiter, update);

export default userRoutes;
