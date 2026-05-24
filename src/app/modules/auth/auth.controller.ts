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

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  ApiResponse.success(res, result, "Successfully Login");
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);
  ApiResponse.success(res, result, "Successfully Registered");
});
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await AuthService.verifyOtp(email, otp);
  ApiResponse.success(res, result, "Email verified successfully");
});

export const AuthController = {
  login,
  register,
  loginUser,
  registerUser,
  verifyOtp,
};
