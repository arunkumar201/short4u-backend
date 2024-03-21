import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const ErrorHandler = (req: Request, res: Response,err:any):void => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    // eslint-disable-next-line no-undef
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};
