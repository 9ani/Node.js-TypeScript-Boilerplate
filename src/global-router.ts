import { Router } from 'express';
import authRouter from './auth/auth-router';
import eventRouter from './events/event-router';
import { authMiddleware } from './middlewares/auth-middleware';

const globalRouter = Router();

globalRouter.use( authRouter);
globalRouter.use( authMiddleware, eventRouter);  // Apply middleware here

export default globalRouter;
