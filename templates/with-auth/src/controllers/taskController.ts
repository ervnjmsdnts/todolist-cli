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

export const getTask = async (req: Request, res: Response) => {
  const currUser = await getCurrentUser(req);

  if (!currUser) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  const task = await Task.findOne({ _id: req.params.id, user: currUser._id });

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  return res.status(200).send(task);
};

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

export const updateTask = async (req: Request, res: Response) => {
  const currUser = await getCurrentUser(req);

  if (!currUser) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  const task = await Task.findOne({ _id: req.params.id, user: currUser._id });

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  task.set({ ...req.body });

  await task.save();

  return res.status(200).send({
    message: "Task updated successfully",
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  const currUser = await getCurrentUser(req);

  if (!currUser) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  const task = await Task.findOne({ _id: req.params.id, user: currUser._id });

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  await task.remove();

  return res.status(200).send({
    message: "Task deleted successfully",
  });
};
