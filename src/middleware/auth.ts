import type {Request,Response,NextFunction} from 'express';
import { verifyJWT } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  console.log('Auth header:', auth);
  if(!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const incomingToken= auth.split(' ')[1] || '';
  try {
    const payload = verifyJWT<{ id: string; userId?: string; email: string }>(incomingToken);
    console.log('Decoded payload:', payload);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized or token expired' });
    }
    const id= payload.id ?? payload.userId;
    if(!id)return res.status(401).json({ message: 'Unauthorized or token expired' });
    req.user = {
      id,
      email: payload.email,
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
  