import { Router } from 'express';
const router = Router();

router.post('', (req, res) => {
    console.log(req.body);
    return res.status(200).json({ message: req.body });
});

export default router;