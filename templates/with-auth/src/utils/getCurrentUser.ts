import { verify } from "jsonwebtoken";
import { User } from "../models/user";
import { Request } from "express";

export const getCurrentUser = async (req: Request) => {
  const { token } = req.cookies;

  if (!token) {
    return null;
  }

  try {
    const { _id } = verify(token, process.env.TOKEN_SECRET!) as {
      _id: string;
    };

    return await User.findById(_id);
  } catch (error) {
    console.error(error);
    return null;
  }
};
