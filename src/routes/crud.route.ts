import {
	create,
	get,
	getUser,
	remove,
	update,
} from "../controllers/user.controller";
import express, { Request, Response } from "express";

import { authLimiter } from '../middleware/limiter/auth-limiter.middleware';

const userCrudRoutes = express.Router();

//GET APIS COLLECTIONS
userCrudRoutes.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to the Short4u Url shortener service v1' });
});

userCrudRoutes.get('/users', authLimiter, get);
userCrudRoutes.get('/users/:email', getUser);

//post
userCrudRoutes.post('/create-user', authLimiter, create);
//delete
userCrudRoutes.delete('/delete-user', authLimiter, remove);
//put
userCrudRoutes.put('/update-user', authLimiter, update);

export default userCrudRoutes;
