import pool from '../db/db';
import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: err.message, err });
        }

        const query = 'SELECT * FROM users where login=? AND password=?';

        connection.query(query, [login, password], (error, results) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: error.message, error });
            }

            return res.json(results);
        });
    });
});

export default router;
