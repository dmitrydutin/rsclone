import { Users, Posts, Comments } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/allposts',
    auth,
    asyncHandler(async (req, res) => {
        const ress = await Posts.findAll({
            attributes: ['id', 'userId', 'text', 'photo', 'likes'],
            include: [
                {
                    model: Users,
                    attributes: ['avatar', 'login'],
                },
                {
                    model: Comments,
                    attributes: ['text', 'userId', 'postId'],
                },
            ],
        });
        return res.json({ list: ress.reverse() });
    }),
);

router.post(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const { login, text, photo, likes } = req.body;
        const userId = await Users.findOne({
            where: {
                login: login,
            },
        });
        const newPost = await Posts.create({
            userId: userId.id,
            text: text,
            photo: photo,
            likes: likes,
        });
        return res.json({ status: 200 });
    }),
);

router.post(
    '/comment',
    auth,
    asyncHandler(async (req, res) => {
        const { login, text, postId } = req.body;
        const user = await Users.findOne({
            where: {
                login: login,
            },
        });
        const post = await Posts.findOne({
            where: {
                id: postId,
            },
        });
        const newComment = await Comments.create({
            userId: user.id,
            postId: post.id,
            text: text,
        });
        return res.json({ newComment });
    }),
);

export default router;
