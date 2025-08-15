import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signJWT(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyJWT(token: string): object | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as object;
  } catch (error) {
    return null;
  }
}
