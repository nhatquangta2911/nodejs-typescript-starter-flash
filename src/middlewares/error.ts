import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from './logging';
const { InternalServerError } = require('../helpers/ErrorHelper');

module.exports = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  console.log(err);
  return InternalServerError(res, err);
};
