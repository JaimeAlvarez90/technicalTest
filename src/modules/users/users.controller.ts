import type { Request, Response, NextFunction } from 'express';
import * as services from './users.services.js';

export async function listUsersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await services.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await services.getUserById(req.params.id!);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await services.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
}

export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await services.updateUser(req.params.id!, req.body);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (error.code === 'P2003') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
}

export async function deleteUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    await services.deleteUser(req.params.id!);
    res.sendStatus(204);
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
}
