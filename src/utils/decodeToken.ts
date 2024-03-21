/* eslint-disable no-undef */
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from './messages';
import { IAuthRequest } from '../middleware/auth/admin.middleware';
import { ROLE } from '../types';
import { config } from '../config/env.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = any;
export const DecodeToken = async (req: IAuthRequest) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return null;
  }
  const tokenInfo = jwt.decode(token);
  let secret = '';
  if (!tokenInfo) {
    throw new Error('Error while decoding token');
  }
  if (req.role === ROLE.ADMIN) {
    if (
      typeof tokenInfo === 'object' &&
      'email' in tokenInfo &&
      tokenInfo.email === config.ADMIN_EMAIL
    ) {
      secret = config.ADMIN_SECRET;
    }
  } else {
    if (req.params.email !== (tokenInfo as T).email) {
      throw new Error(ERROR_MESSAGES.PERMISSION_DENIED);
    }
    secret = config.SECRET;
  }
  try {
    const decode: JwtPayload = jwt.verify(token, secret) as JwtPayload;

    if (!decode || !decode._id) {
      throw new Error('Invalid token structure');
    }
    return decode._id;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error(`Error while decoding token: ${error}`);
  }
};
