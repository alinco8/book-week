import express from 'express';
import * as socketIO from 'socket.io';
import { Deta } from 'deta';
import chalk from 'chalk';
import http from 'http';

const deta = Deta();
const db = deta.Base('simple_db');
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
const record = (await db.fetch({ key: 'homeroom' })).items[0] as Record<
    string,
    number
>;

delete record.key;

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
        const newValue = (record[key] += value);

        io.emit('changed', key, newValue);

        db.update({ [key]: record[key] }, 'homeroom');
    });

    socket.on('init', () => socket.emit('all', record));
});

server.listen(port, () => {
    console.log(chalk.hex('#ffff00')(`Server running on port:${port}...`));
});
