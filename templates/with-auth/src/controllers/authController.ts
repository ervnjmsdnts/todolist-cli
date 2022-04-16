import { Request, Response } from "express";
import { IUser, User } from "../models/user";
import { createToken } from "../utils/token";
import { serialize } from "cookie";

interface IUserRegister extends IUser {
  confirmationPassword: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export const registerController = async (
  req: Request<{}, {}, IUserRegister>,
  res: Response
) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist) {
    return res.status(400).send({
      message: "Email already exist",
    });
  }

  if (req.body.password !== req.body.confirmationPassword) {
    return res.status(400).send({
      message: "Password and confirmation password do not match",
    });
  }

  const user = new User({ ...req.body });

  await user.save();

  return res.status(201).send({
    message: "User created successfully",
  });
};

export const loginController = async (
  req: Request<{}, {}, IUserLogin>,
  res: Response
) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({
      message: "Email or password is incorrect",
    });
  }

  const isPasswordValid = await user.comparePassword(req.body.password);

  if (!isPasswordValid) {
    return res.status(400).send({
      message: "Email or password is incorrect",
    });
  }

  const token = createToken(user);

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })
  );

  return res.status(200).send({
    message: "User logged in successfully",
  });
};

export const logoutController = async (_req: Request, res: Response) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    })
  );

  return res.status(200).send({
    message: "User logged out successfully",
  });
};
