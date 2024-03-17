import { NextFunction, Request, Response } from 'express';

import { AnyZodObject } from 'zod';
import { logger } from '../logger';

export const validate =
  (schema: AnyZodObject) =>
    async (req: Request,res: Response,next: NextFunction) => {    
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      logger.error(`Validation error: ${error}`);
      return res.status(400).json(error);
    }
  };
