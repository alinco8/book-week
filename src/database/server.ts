import express from 'express';
import socketIO from 'socket.io';
import db from '@cyclic.sh/dynamodb';
import http from 'http';
import chalk from 'chalk';

(async () => {
    const app = express();
    const server = new http.Server(app);
    const io = new socketIO.Server<
        {
            change(key: string, value: number): void;
        },
        {
            all(db: Record<string, number>): void;
            changed(key: string, value: number): void;
        },
        { ping(): void }
    >(server);
    const port = process.env.PORT || 3000;
    const col = db.collection('main');
    const record: Record<string, number> = Object.fromEntries(
        await Promise.all(
            (await col.list()).results.map(async (result) => [
                result.key,
                (await col.get(result.key)).props.value,
            ]),
        ),
    );

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
        socket.emit('all', record);

        socket.on('change', async (key, value) => {
            const v = (record[key] += value);
            io.emit('changed', key, v);
        });
    });

    app.use('*', (_req, res) => {
        res.json({ msg: 'book-week database' });
    });

    app.listen(port, () => {
        console.log(chalk.hex('#ffff00')(`Server running on port:${port}...`));
    });
})();
