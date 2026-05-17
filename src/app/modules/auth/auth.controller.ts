import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../../utils/ApiResponse";
import catchAsync from "../../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  ApiResponse.success(res, result, "Successfully Login");
});

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  ApiResponse.success(res, result, "Successfully Register");
});


export const AuthController = {
  login,
  register,
};
