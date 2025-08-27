import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('🛑 Zod Validation Error:', error.issues);
        return res.status(400).json({
          message: 'Validation error',
          errors: error.issues, // <-- Use `.issues` not `.errors`
        });
      }

      console.error('❌ Unexpected validation error:', error);
      return res.status(500).json({
        message: 'Internal validation error',
      });
    }
  };
