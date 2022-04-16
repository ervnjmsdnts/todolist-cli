import { sign } from "jsonwebtoken";
import { IUser } from "../models/user";
import { omit } from "lodash";

export const createToken = (user: IUser) => {
  return sign(omit(user.toJSON(), "password"), process.env.TOKEN_SECRET!);
};
