import { Router } from 'express';
import pool from '../db/db';

const router = Router();

router.get('/allposts', (req, res) => {   
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: err.message, err });
        }

        const query = 'SELECT * FROM posts';

        connection.query(query, (error, results) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: error.message, error });
            }            
            return res.json(results);
        });
    });
});

export default router;
