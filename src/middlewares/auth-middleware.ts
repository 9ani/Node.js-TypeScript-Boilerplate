import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth-service';

const authService = new AuthService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  const payload = authService.verifyJwt(token);

  if (!payload) {
    console.log('Invalid or expired token');
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  (req as any).user = {
    id: payload.id,
    email: payload.email,
    city: payload.city,
  };
  console.log('User attached to request:', (req as any).user);
  next();
};
