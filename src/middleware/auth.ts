import type {Request,Response,NextFunction} from 'express';
import { verifyJWT } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if(!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const incomingToken= auth.split(' ')[1] || '';
  try {
    const payload = verifyJWT(incomingToken);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {

    return res.status(401).json({ message: 'Unauthorized' });
  }
}
  