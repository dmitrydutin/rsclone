import { Dialogs, Messages, Users } from '../database/main';
import { Op } from 'sequelize';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const { userId, searchInput } = req.query;

        if (!userId) {
            throw createError(400, 'Not all parameters passed');
        }

        const dialogs = await Dialogs.findAll({
            attributes: ['id', 'firstUserId', 'secondUserId'],
            include: [
                {
                    model: Messages,
                    attributes: ['text'],
                    limit: 1,
                    order: [['id', 'DESC']],
                },
            ],
            where: {
                [Op.or]: [{ firstUserId: userId }, { secondUserId: userId }],
            },
        });

        const dialogsWithCorrectId = dialogs.map((dialog) => {
            const authorId =
                dialog.firstUserId == userId ? dialog.secondUserId : dialog.firstUserId;
            return { id: dialog.id, userId: authorId, messages: dialog.messages };
        });

        const usersId = dialogsWithCorrectId.map((dialog) => dialog.userId);

        const users = await Users.findAll({
            attributes: ['id', 'name', 'surname', 'avatar'],
            where: {
                id: usersId,
                [Op.or]: [
                    { name: { [Op.substring]: searchInput ? searchInput : '' } },
                    { surname: { [Op.substring]: searchInput ? searchInput : '' } },
                ],
            },
        });

        let result = dialogsWithCorrectId.map((dialog) => {
            const user = users.find((user) => user.id === dialog.userId);
            delete dialog.userId;
            dialog.user = user;
            return dialog;
        });

        result = result.filter((dialog) => dialog.user !== undefined);

        return res.json({
            status: 200,
            dialogs: result,
        });
    }),
);

export default router;
