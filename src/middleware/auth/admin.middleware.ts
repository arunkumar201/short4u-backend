import { NextFunction, Request, Response } from 'express';

import { DecodeToken } from '../../utils/decodeToken';
import { ERROR_MESSAGES } from '../../utils/messages';
import { ROLE } from '../../types';
import { logger } from '../../logger';

export interface IAuthRequest extends Request {
  role: ROLE;
  userId?: string;
}

export const requireAdminAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
	try {
	req.role = ROLE.ADMIN;
	const token = await DecodeToken(req);
    if (!token) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_TOKEN });
    }
    next();
  } catch (error) {
    logger.error(`Error while decoding token: ${error}`);
    return res
      .status(401)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};
