import { Request, Response, NextFunction } from 'express';
import {Schema} from 'joi';

export function validationMiddleware(schema: Schema){
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map(detail =>detail.message).join(', ');
      return res.status(400).json({ message});
    }
    next();
  };
}
