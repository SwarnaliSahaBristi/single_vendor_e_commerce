import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { UserRegister } from "./auth.validation";
import nodemailer from "nodemailer";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }
  return user;
};

const register = async (payload: UserRegister) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 6);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return user;
};

const registerUser = async (payload: any) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    otp,
    otpExpiry,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: payload.email,
    subject: "Verify Your Email",
    text: `Your OTP is ${otp}`,
  });

  return {
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    throw new Error("OTP expired");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  return user;
};

const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password as string
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.otp;
  delete userObj.otpExpiry;

  return {
    user: userObj,
  };
};

export const AuthService = {
  login,
  register,
  registerUser,
  verifyOtp,
  loginUser,
};
