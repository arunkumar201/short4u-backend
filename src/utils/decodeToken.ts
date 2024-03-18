/* eslint-disable no-undef */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from './messages';

export const DecodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  console.log(token, '-------------------------- -----------');
  if (!token) {
    return res.status(400).json({ message: ERROR_MESSAGES.MISSING_TOKEN });
  }

  try {
    const decode: JwtPayload = jwt.verify(
      token,
      process.env.SECRET ?? '123',
    ) as JwtPayload;

    console.log(decode);
    if (!decode || !decode._id) {
      throw new Error('Invalid token structure');
    }
    // req.userId = decode.id;
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};
