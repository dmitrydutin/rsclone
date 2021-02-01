import { Users, Posts, Comments, Likes } from '../database/main';
import Sequelize from 'sequelize';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { request, Router } from 'express';
const router = Router();

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
                'createdAt',
                [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentsCount'],
            ],
            include: [
                {
                    model: Users,
                    attributes: ['avatar', 'login', 'name', 'surname'],
                },
                {
                    model: Likes,
                    attributes: ['userId', 'postId'],
                },
                {
                    model: Comments,
                    attributes: [],
                },
            ],
            group: ['posts.id', 'likes.id'],
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

        const user = await Users.findOne({
            attributes: ['login', 'avatar', 'name', 'surname'],
            where: {
                id: newPost.userId,
            },
        });

        return res.json({
            status: 200,
            post: {
                ...newPost.dataValues,
                user: {
                    login: user.login,
                    avatar: user.avatar,
                    name: user.name,
                    surname: user.surname,
                },
            },
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
            attributes: ['id', 'text', 'userId', 'createdAt'],
            where: { postId },
            order: [['id', 'DESC']],
            include: [
                {
                    model: Users,
                    attributes: ['avatar', 'login', 'name', 'surname'],
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

        const user = await Users.findOne({
            attributes: ['login', 'avatar', 'name', 'surname'],
            where: {
                id: newComment.userId,
            },
        });

        return res.json({
            status: 200,
            comment: {
                ...newComment.dataValues,
                user: {
                    login: user.login,
                    avatar: user.avatar,
                    name: user.name,
                    surname: user.surname,
                },
            },
        });
    }),
);

router.post(
    '/likes',
    auth,
    asyncHandler(async (req, res) => {
        const { postId } = req.body;

        if (!postId) {
            throw createError(400, 'Not all parameters passed');
        }

        const like = await Likes.findOne({
            where: {
                postId,
                userId: req.app.get('userId'),
            },
        });
        if (like) {
            const newLike = await Likes.destroy({
                where: {
                    postId,
                    userId: req.app.get('userId'),
                },
            });
            return res.json({
                status: 200,
                like: newLike,
                message: 'Like removed',
            });
        }

        const newLike = await Likes.create({
            userId: req.app.get('userId'),
            postId,
        });
        return res.json({
            status: 200,
            like: newLike,
            message: 'Like created',
        });
    }),
);

export default router;
