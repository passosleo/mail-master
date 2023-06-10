import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

type ValidateProps = {
  schema: Schema;
  path: 'body' | 'query' | 'params';
};

export function validate(target: ValidateProps | ValidateProps[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const isArray = Array.isArray(target);
    const targets = isArray ? target : [target];
    const errors = new Array<string>();

    for (const { schema, path } of targets) {
      const { error } = schema.validate(req[path], {
        abortEarly: false,
      });

      if (error) {
        error.details
          .map((x) => `[${path}] - ` + x.message.replace(/"/g, ''))
          .map((x) => errors.push(x));
      }
    }

    if (errors.length) {
      return res.status(400).json({ success: false, error: errors });
    }

    next();
  };
}
