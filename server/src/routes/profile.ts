import { Users, Posts, Likes, Comments } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/:id',
    auth,
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw createError(400, 'Not all parameters passed');
        }

        const user = await Users.findOne({
            attributes: ['id', 'name', 'surname', 'quote', 'avatar', 'city', 'about', 'createdAt'],
            where: { id },
        });

        return res.json({
            status: 200,
            user,
        });
    }),
);

router.get(
    '/posts/count',
    auth,
    asyncHandler(async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            throw createError(400, 'Not all parameters passed');
        }

        const postsCount = await Posts.count({
            where: { userId },
        });

        return res.json({
            status: 200,
            postsCount,
        });
    }),
);

router.get(
    '/likes/count',
    auth,
    asyncHandler(async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            throw createError(400, 'Not all parameters passed');
        }

        const likesCount = await Likes.count({
            where: { userId },
        });

        return res.json({
            status: 200,
            likesCount,
        });
    }),
);

router.get(
    '/comments/count',
    auth,
    asyncHandler(async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            throw createError(400, 'Not all parameters passed');
        }

        const commentsCount = await Comments.count({
            where: { userId },
        });

        return res.json({
            status: 200,
            commentsCount,
        });
    }),
);

router.post(
    '/users/:id',
    auth,
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, surname, quote, city, about, avatar } = req.body;

        await Users.update({ name, surname, quote, city, about, avatar }, { where: { id } });

        const user = await Users.findOne({
            attributes: ['id', 'name', 'surname', 'quote', 'avatar', 'city', 'about', 'createdAt'],
            where: { id },
        });

        return res.json({
            status: 200,
            user,
        });
    }),
);

export default router;
