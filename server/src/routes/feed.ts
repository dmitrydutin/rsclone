import { Users, Posts } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/allposts',
    auth,
    asyncHandler(async (req, res) => {
        const list = await Posts.findAll();

        list.forEach(async (post) => {
            const userId = await Users.findAll({
                where: {
                    userId: post.userId,
                },
            });
            post.login = userId[0].login;
            console.log(post);
        });
        return res.json({ list });
    }),
);

router.post(
    '/',
    auth,
    asyncHandler(async (req, res) => {
        const { login, text, photo, likes } = req.body;
        const userId = await Users.findAll({
            where: {
                login: login,
            },
        });
        // const ress=userId[0].id
        //  return res.json({ress});
        const newPost = await Posts.create({
            userId: userId[0].id,
            text: text,
            photo: photo,
            likes: likes,
        });
    }),
);

export default router;
