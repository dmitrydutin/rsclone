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
        const { dialogId } = req.query;

        if (!dialogId) {
            throw createError(400, 'Not all parameters passed');
        }

        const messages = await Messages.findAll({
            attributes: ['id', 'text', 'photo', 'isUserMessage'],
            include: [
                {
                    model: Dialogs,
                    attributes: ['id'],
                    include: [
                        {
                            model: Users,
                            attributes: ['name', 'surname', 'avatar'],
                        },
                    ],
                },
            ],
            where: { dialogId },
        });

        return res.json({
            status: 200,
            messages,
        });
    }),
);

router.post(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const { dialogId, message, url } = req.body;

        if (!dialogId) {
            throw createError(400, 'Not all parameters passed');
        }

        const newMessage = await Messages.create({
            dialogId,
            text: message,
            photo: url,
            isUserMessage: 1,
        });

        return res.json({
            status: 200,
            message: newMessage,
        });
    }),
);

export default router;
