import express from 'express';

import collectionRouter from './collection';

const app = express();

app.use('/api/', collectionRouter);

export default app;
