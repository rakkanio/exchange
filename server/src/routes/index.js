import express from 'express';

import collectionRouter from './collection';
import algoAccountRouter from './AlgoAccount';

const app = express();

app.use('/api/collection/', collectionRouter);
app.use('/api/algo/', algoAccountRouter);

export default app;
