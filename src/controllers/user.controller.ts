/* eslint-disable no-undef */
import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateUser,
} from '../services/user.service';

import { ERROR_MESSAGES } from '../utils/messages';
import { IUser } from '../types/model.types';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateJWT } from '../utils/generateJwt';
import { getHashPassword } from '../utils/password';
import { logger } from '../logger';

//get methods
export const get = expressAsyncHandler(async (_, res: Response) => {
  try {
    const users = await getAllUsers();
    if (users) {
      res.status(201).json({ users: users });
    }
  } catch (err: unknown) {
    console.log('Error is Occurred in getUsers', err);
    res.status(StatusCodes.EXPECTATION_FAILED).json({ message: err });
  }
});

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const users = await getUserDetails(email);
    if (users) {
      res.status(201).json({ users: users });
    } else {
       res.status(404).json({ message: 'user not found' });
    }
  } catch (err: unknown) {
    console.log('Error is Occurred in getUsers', err);
    next(err);
  }
};

//Post Methods
export const create = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, last_login, password } = req.body;
      const hashPassword = await getHashPassword(password);
      if (!hashPassword) throw new Error('Error while hashing password');
      const userData: IUser = {
        name,
        email: email.toLowerCase(),
        password: hashPassword,
        last_login,
      };
      const result = await createUser(userData);
      if (!result) {
        res.status(StatusCodes.ACCEPTED).json({ message: result });
      }
      res.status(201).json({ data: result });
    } catch (error) {
      console.log(`error while creating user: ${error}`);
      next(error);
    }
  },
);

export const  login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //check the user exist or not
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //here we need to return jwt token  in the response
        const signUser = {
          email: user.email,
          _id: user._id,
          last_login: user.last_login,
        };
        try {
          const token = await generateJWT(signUser);
          return res.status(200).json({
            user:signUser,
            message: 'Login successfully',
            token,
          });
        } catch (error) {
          logger.info(`Error while generating JWT: ${error}`);
          res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json(ERROR_MESSAGES.OPERATION_FAILED);
        }
      } else {
        res.status(200).json({ message: 'password is incorrect' });
      }
    } else {
      res.status(200).json({
        message: 'User not found. Please register',
      });
    }
  } catch (error) {
    logger.error(`Error while logging in user: ${error}`);
    res.status(StatusCodes.EXPECTATION_FAILED).json(error);
  }
};

//PUT method
export const update = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const data = {
      email,
      name,
    };

    const result = await updateUser(data);

    if (result) {
      return res
        .status(200)
        .json({ message: 'User updated successfully', user: result });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(`Error while updating user: ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE method
export const remove = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const deletedUser = await deleteUser(email);

    if (deletedUser) {
      return res
        .status(200)
        .json({ message: 'User deleted successfully', user: deletedUser });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(`Error while deleting user: ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
