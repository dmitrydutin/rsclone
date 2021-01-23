import express from 'express';
import path from 'path';
import http from 'http';
import * as socket from 'socket.io';

import authRouter from './routes/auth';
import feedRouter from './routes/feed';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/api/auth', authRouter);
app.use('/feed', feedRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
