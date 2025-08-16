import type { Request, Response, NextFunction } from "express";
import {signIn,signOut } from './auth.service.js';

export async function signInHandler(req: Request, res: Response, next: NextFunction) {
  try {
     const {email,password} = req.body;
     const data = await signIn(email,password);
     res.json(data)
  } catch (error) {
     next(error);
  }
}

export async function signOutHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await signOut();
    res.json(data)
  } catch (error) {
    next(error);
  }
}