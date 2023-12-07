import express from 'express';
import db from '@cyclic.sh/dynamodb';
import chalk from 'chalk';

const app = express();
const port = process.env.PORT || 3000;
const col = db.collection('main');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:key', async (req, res) => {
    const key = req.params.key;
    const item = await col.get(key);

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
