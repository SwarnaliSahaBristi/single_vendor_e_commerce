import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import env from "../../config/env";
import { ErrorResponse } from "../../types";


const globalError: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong"

  const errorResponse: ErrorResponse  = {
    success: false,
    message: message,
  }

  if(env.node_env === "development"){
    errorResponse.stack= err.stack,
    errorResponse.error= err
  }
  res.status(statusCode).json(errorResponse)
};

export default globalError;