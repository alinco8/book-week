import express from 'express';
import db from '@cyclic.sh/dynamodb';
import chalk from 'chalk';

const app = express();
const port = process.env.PORT || 3000;
const col = db.collection('main');

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

app.get('/', async (_req, res) => {
    const item = await col.list();

    res.json(item);
});
app.get('/:key', async (req, res) => {
    const key = req.params.key;
    const item = await col.get(key);

    res.json(item);
});
app.patch('/:key', async (req, res) => {
    const key = req.params.key;
    const item = await col.set(
        key,
        {
            value: (await col.get(key)) + req.body.value,
        },
        {},
    );

    res.json(item);
});
app.post('/:key', async (req, res) => {
    const key = req.params.key;
    const item = await col.set(key, req.body, {});

    res.json(item);
});

app.delete('/:key', async (req, res) => {
    const key = req.params.key;
    const item = await col.delete(key, req.body, {});

    res.json(item);
});

app.use('*', (_req, res) => {
    res.json({ msg: 'book-week database' });
});

app.listen(port, () => {
    console.log(chalk.hex('#ffff00')(`Server running on port:${port}...`));
});
