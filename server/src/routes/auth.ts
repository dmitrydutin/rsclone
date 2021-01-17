import pool from '../db/db';
import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: err.message, err });

        const query = `
            SELECT users.login, users.password, role.value AS role FROM users
            INNER JOIN role ON users.role=role.id WHERE login=? AND password=?;
        `;

        connection.query(query, [login, password], (error, results) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: error.message, error });
            }

            if (results.length === 0) {
                return res.json({ isAuth: false, role: null });
            }

            return res.json({ isAuth: true, role: results[0].role });
        });
    });
});

export default router;
