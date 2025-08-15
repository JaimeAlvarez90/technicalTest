import type { Request, Response, NextFunction } from 'express';
import logger from "../logger/index.js";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
