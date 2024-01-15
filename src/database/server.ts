import express from 'express';
import * as socketIO from 'socket.io';
import chalk from 'chalk';
import http from 'http';

const app = express();
const server = new http.Server(app);
const io = new socketIO.Server<
    SocketEvents.Client2Server,
    SocketEvents.Server2Client,
    SocketEvents.Server
>(server, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 3000;
const database: Record<string, number> = {
    '1-1': 0,
    '1-2': 0,
    '1-3': 0,
    '1-4': 0,
    '1-5': 0,
    '1-6': 0,
    '2-1': 0,
    '2-2': 0,
    '2-3': 0,
    '2-4': 0,
    '2-5': 0,
    '2-6': 0,
    '3-1': 0,
    '3-2': 0,
    '3-3': 0,
    '3-4': 0,
    '3-5': 0,
    '3-6': 0,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

io.on('connection', (socket) => {
    socket.on('change', async (key, value) => {
        const newValue = (database[key] += value);

        io.emit('changed', key, newValue);
    });

    socket.on('init', () => socket.emit('all', database));
});

app.use('*', (req, res) => {
    res.send('404');
});

server.listen(port, () => {
    console.log(chalk.hex('#ffff00')(`Server running on port:${port}...`));
});
