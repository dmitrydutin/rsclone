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

router.post(
    '/login',
    asyncHandler(async (req, res) => {
        return res.json({});
    }),
);

export default router;
