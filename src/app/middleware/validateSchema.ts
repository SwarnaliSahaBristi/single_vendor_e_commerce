import { NextFunction, Request, Response } from "express";
import z, { success } from "zod";
import status from "http-status";

const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(status.BAD_REQUEST).json({
          success: false,
          message: result.error.issues[0]?.message,
        });
      }
      req.body = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
