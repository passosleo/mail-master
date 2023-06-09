import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

type ValidateProps = {
  schema: Schema;
  path: 'body' | 'query' | 'params';
};

export function validate({ schema, path }: ValidateProps) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[path]);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((x) => x.message.replace(/"/g, '')) });
    }

    next();
  };
}
