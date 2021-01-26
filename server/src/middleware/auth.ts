import { Request, Response, NextFunction } from 'express';
import { getSessionByToken } from '../service/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');

    if (!token) {
        throw createError(400, 'No auth token is provided');
    }

    const session = await getSessionByToken(token);

    if (!session) {
        throw createError(403, 'Session not found');
    }

    req.app.set('userId', session.userId);

    next();
});
