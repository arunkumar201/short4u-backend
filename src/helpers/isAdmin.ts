import { config } from '../config/env.config';

export const isAdmin = (email: string): boolean => {
  if (email === config.ADMIN_EMAIL) {
    return true;
  }
  return false;
};
