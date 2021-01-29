import { Users, Posts, Comments, Likes } from '../database/main';
import Sequelize from 'sequelize';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { request, Router } from 'express';
const router = Router();

// const posts = await Posts.findAll({
//     attributes: ['id', 'userId', 'text', 'photo', 'likes'],
//     include: [
//         {
//             model: Users,
//             attributes: ['avatar', 'login'],
//         },
//         {
//             model: Comments,
//             attributes: ['text', 'userId', 'postId'],
//             include: [
//                 {
//                     model: Users,
//                     attributes: ['avatar', 'login'],
//                 },
//             ],
//         },
//     ],
//     order: [['id', 'DESC']],
// });

router.get(
    '/posts',
    auth,
    asyncHandler(async (req, res) => {
        const posts = await Posts.findAll({
            attributes: [
                'id',
                'userId',
                'text',
                'photo',
                [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentsCount'],
                [Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likesCount'],
            ],
            include: [
                {
                    model: Users,
                    attributes: ['avatar', 'login'],
                },
                {
                    model: Likes,
                    attributes: ['postId', 'userId'],
                },
                {
                    model: Comments,
                    attributes: [],
                },
            ],
            group: ['id'],
            order: [['id', 'DESC']],
        });

        return res.json({
            status: 200,
            posts,
        });
    }),
);

router.post(
    '/posts',
    auth,
    asyncHandler(async (req, res) => {
        const { text, photo } = req.body;

        if (!text) {
            throw createError(400, 'Not all parameters passed');
        }

        const newPost = await Posts.create({
            userId: req.app.get('userId'),
            text: text,
            photo: photo,
        });

        return res.json({
            status: 200,
            post: newPost,
        });
    }),
);

router.get(
    '/comments',
    auth,
    asyncHandler(async (req, res) => {
        const { postId } = req.query;

        if (!postId) {
            throw createError(400, 'Not all parameters passed');
        }

        const comments = await Comments.findAll({
            attributes: ['text', 'userId'],
            where: { postId },
            order: [['id', 'DESC']],
            include: [
                {
                    model: Users,
                    attributes: ['avatar', 'login'],
                },
            ],
        });

        return res.json({
            status: 200,
            comments,
            postId,
        });
    }),
);

router.post(
    '/comments',
    auth,
    asyncHandler(async (req, res) => {
        const { text, postId } = req.body;

        if (!text || !postId) {
            throw createError(400, 'Not all parameters passed');
        }

        const post = await Posts.findOne({
            attributes: ['id'],
            where: {
                id: postId,
            },
        });

        const newComment = await Comments.create({
            userId: req.app.get('userId'),
            postId: post.id,
            text: text,
        });

        return res.json({
            status: 200,
            comment: newComment,
        });
    }),
);

export default router;
