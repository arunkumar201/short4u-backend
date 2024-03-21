import { NextFunction, Response } from 'express';

import { IAuthRequest } from '../middleware/auth/admin.middleware';
import { ROLE } from '../types';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model';
import { isAdmin } from '../helpers/isAdmin';

export const getUserRole = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.ACCEPTED).json({ message: 'User not found' });
  }
  req.user = user;
  if (isAdmin(user.email)) {
    req.role = ROLE.ADMIN;
  } else {
    req.role = ROLE.USER;
  }
  next();
};
