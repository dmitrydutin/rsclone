import express from 'express';
import path from 'path';
import sequelize from './database/main';

import authRouter from './routes/auth';
import feedRouter from './routes/feed';
import profileRouter from './routes/profile';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/api/auth', authRouter);
app.use('/api/feed', feedRouter);
app.use('/api/profile', profileRouter);

app.use((error, req, res, next) => {
    res.json({
        status: error.status ?? 500,
        message: error.message,
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
