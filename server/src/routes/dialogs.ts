import { Dialogs, Messages, Users } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            throw createError(400, 'Not all parameters passed');
        }

        const dialogs = await Dialogs.findAll({
            attributes: ['id'],
            include: [
                {
                    model: Messages,
                    attributes: ['text', 'photo'],
                    limit: 1,
                    order: [['id', 'DESC']],
                },
                {
                    model: Users,
                    attributes: ['name', 'surname', 'avatar'],
                },
            ],
            where: { userId },
        });

        return res.json({
            status: 200,
            dialogs,
        });
    }),
);

export default router;
