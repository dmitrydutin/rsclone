import { Users, Roles, Tokens } from '../database/main';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import path from 'path';
import dotenv from 'dotenv';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });
const { MYSQL_SALT } = process.env;

const generateToken = () => {
    return uuidv4();
};

const getPasswordHash = (password: string) => {
    return md5(password + MYSQL_SALT);
};

router.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { login, password } = req.body;

        if (!login || !password) {
            throw createError(400, 'Not all parameters passed');
        }

        const passwordHash = getPasswordHash(password);

        const user = await Users.findOne({
            attributes: ['id', 'name', 'surname', 'quote', 'avatar', 'city', 'createdAt', 'login'],
            include: [
                {
                    model: Roles,
                    attributes: ['role'],
                },
            ],
            where: { login, passwordHash },
        });

        if (user) {
            const data = {
                id: user.id,
                role: user.role.role,
                name: user.name,
                surname: user.surname,
                quote: user.quote,
                avatar: user.avatar,
                city: user.city,
                createdAt: user.createdAt,
                login: user.login,
            };
            const token = generateToken();

            await Tokens.create({
                token,
                userId: user.id,
                expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
            });

            return res.json({
                status: 200,
                user: data,
                token,
            });
        }

        return res.json({
            status: 403,
            reason: 'The login or password you entered is incorrect',
        });
    }),
);

router.post(
    '/join',
    asyncHandler(async (req, res) => {
        const { name, surname, login, password } = req.body;

        if (!name || !surname || !login || !password) {
            throw createError(400, 'Not all parameters passed');
        }

        const passwordHash = getPasswordHash(password);

        const [, created] = await Users.findOrCreate({
            where: { login },
            defaults: { login, passwordHash, name, surname },
        });

        if (created) {
            const user = await Users.findOne({
                attributes: ['id', 'name', 'surname', 'quote', 'avatar', 'city', 'createdAt'],
                include: [
                    {
                        model: Roles,
                        attributes: ['role'],
                    },
                ],
                where: { login, passwordHash },
            });

            const data = {
                role: user.role.role,
                name: user.name,
                surname: user.surname,
                quote: user.quote,
                avatar: user.avatar,
                city: user.city,
                createdAt: user.createdAt,
            };
            const token = generateToken();

            await Tokens.create({
                token,
                userId: user.id,
                expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
            });

            return res.json({
                status: 200,
                user: data,
                token,
            });
        }

        return res.json({
            status: 403,
            reason: 'Login entered already in use',
        });
    }),
);

router.post(
    '/me',
    auth,
    asyncHandler(async (req, res) => {
        const user = await Users.findByPk(req.app.get('userId'));

        if (!user) {
            throw createError(403, 'User not found');
        }

        return res.json({
            status: 200,
            user,
        });
    }),
);

router.post(
    '/logout',
    auth,
    asyncHandler(async (req, res) => {
        await Tokens.destroy({
            where: {
                userId: req.app.get('userId'),
            },
        });

        return res.json({
            status: 200,
        });
    }),
);

export default router;
