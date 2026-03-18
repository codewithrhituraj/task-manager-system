import { Request, Response } from "express";
import { prisma } from "../prisma";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });

  res.json(task);
};

// GET TASKS (Pagination + Search + Filter)
export const getTasks = async (req: any, res: Response) => {
  const userId = req.user.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const search = req.query.search || "";
  const status = req.query.status;

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      title: { contains: search },
      ...(status ? { status } : {}),
    },
    orderBy: {
        createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  res.json(tasks);
};

// UPDATE TASK
export const updateTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description },
  });

  res.json(task);
};

// DELETE TASK
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.task.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Task deleted" });
};

// TOGGLE STATUS
export const toggleTask = async (req: any, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  const updated = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      status: task?.status === "pending" ? "completed" : "pending",
    },
  });

  res.json(updated);
};