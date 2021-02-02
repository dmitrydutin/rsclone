import { Dialogs } from '../database/main';
import { auth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Router } from 'express';
const router = Router();

router.get(
    '/',
    auth,
    asyncHandler(async (req, res) => {

    }),
);

export default router;
