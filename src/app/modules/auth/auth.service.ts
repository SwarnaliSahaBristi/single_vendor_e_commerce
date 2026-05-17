import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { UserRegister } from "./auth.validation";

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
  const { password, ...rest } = user;
  return rest;
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

  const { password, ...rest } = user;

  return rest;
};

export const AuthService = {
  login,
  register,
};
