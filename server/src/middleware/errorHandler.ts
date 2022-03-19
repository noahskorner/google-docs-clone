import { Errback, Response, NextFunction, Request } from 'express';

const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err);
  res.sendStatus(500);
};

export default errorHandler;
