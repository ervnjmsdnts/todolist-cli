import { Request, Response } from "express";
import { Task } from "../models/task";
import { getCurrentUser } from "../utils/getCurrentUser";

export const getAllTask = async (req: Request, res: Response) => {
  const currUser = await getCurrentUser(req);

  if (!currUser) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  const tasks = await Task.find({ user: currUser._id });

  return res.status(200).send(tasks);
};

export const getTask = (req: Request, res: Response) => {};

export const createTask = async (req: Request, res: Response) => {
  const currUser = await getCurrentUser(req);
  const task = new Task({
    ...req.body,
    owner: currUser?._id,
  });

  await task.save();

  return res.status(201).send({
    message: "Task created successfully",
  });
};

export const updateTask = (req: Request, res: Response) => {};

export const deleteTask = (req: Request, res: Response) => {};
