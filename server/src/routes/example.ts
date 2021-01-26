import { Users } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.post(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const list = await Users.findByPk(req.app.get('userId'));

        if (!list) {
            throw createError(400, 'User email not found');
        }

        res.json({ list });
    }),
);

router.get(
    '/test',
    auth,
    asyncHandler(async (req, res) => {
        res.json({ list: 'list' });
    }),
);

export default router;
