import { Users, Roles, Tokens } from '../database/main';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import path from 'path';
import dotenv from 'dotenv';
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
            attributes: ['id', 'name', 'surname', 'quote', 'avatar', 'city', 'createdAt'],
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

            return res.status(200).json({
                user: data,
                token,
            });
        }

        const reason = 'The login or password you entered is incorrect';

        return res.status(403).json({
            reason,
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

            return res.status(200).json({
                user: data,
                token,
            });
        }

        const reason = 'Login entered already in use';

        return res.status(403).json({
            reason,
        });
    }),
);

export default router;
