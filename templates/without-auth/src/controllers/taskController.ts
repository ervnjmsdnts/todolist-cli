import { Request, Response } from "express";
import { Task } from "../models/task";

export const getAllTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find();

  return res.status(200).send(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  return res.status(200).send(task);
};

export const createTask = async (req: Request, res: Response) => {
  const task = new Task({
    ...req.body,
  });

  await task.save();

  return res.status(201).send({
    message: "Task created successfully",
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  return res.status(200).send({
    message: "Task updated successfully",
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });

  if (!task) {
    return res.status(400).send({
      message: "Task not found",
    });
  }

  return res.status(200).send({
    message: "Task deleted successfully",
  });
};
