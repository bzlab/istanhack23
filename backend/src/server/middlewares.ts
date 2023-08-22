import { Request, Response, NextFunction } from 'express';

export const errorHandler = function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).send({ message: err.message || 'server error' });
};
