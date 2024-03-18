import { IUser } from 'types';
import { JWT_EXPIRING } from '../globalConfig';
import { config } from '../config/env.config';
import jwt from 'jsonwebtoken';
import { logger } from '../logger';

/**
 * Generates a JWT token for the provided user data.
 *
 * @param {Partial<IUser>} signUser - The user object to sign in the token
 * @return {Promise<string>} The generated JWT token
 */
export const generateJWT = async (signUser: Partial<IUser>): Promise<string> => {
  try {
    const token = jwt.sign(signUser, config.SECRET ?? '111102', {
      expiresIn: JWT_EXPIRING,
      subject: 'user',
    });
    return token;
  } catch (error) {
    logger.info(`Error while generating JWT: ${error}`);
    throw new Error('Error while generating JWT');
  }
};
